import { useMemo, useState } from 'react';
import { brl } from './supabase.js';
import { errorText, updateMany } from './lib.js';
import ProductForm from './ProductForm.jsx';

export default function ProductsTab({ rows, reload, notify }) {
  const [editing, setEditing] = useState(null);
  const [q, setQ] = useState('');
  const [show, setShow] = useState('todas');
  const [busyId, setBusyId] = useState(null);
  const [formKey, setFormKey] = useState(0);

  const shown = useMemo(() => {
    const t = q.trim().toLowerCase();
    return rows.filter((r) => (!t || r.nome.toLowerCase().includes(t) || (r.categoria || '').toLowerCase().includes(t))
      && (show === 'todas' || (show === 'escondidas' ? !r.ativo : show === 'promocao' ? r.preco_antigo != null : show === 'sempreco' ? r.preco == null : true)));
  }, [rows, q, show]);

  const act = async (r, set, ok) => {
    setBusyId(r.id);
    try {
      await updateMany([{ id: r.id, set }]);
      notify(ok);
      await reload();
    } catch (err) {
      notify(errorText(err), true);
    }
    setBusyId(null);
  };

  if (editing) {
    return (
      <ProductForm
        key={formKey}
        initial={editing === 'new' ? null : editing}
        rows={rows}
        onClose={() => setEditing(null)}
        onSaved={(text, again) => { setEditing(again ? 'new' : null); setFormKey((k) => k + 1); notify(text); reload(); window.scrollTo({ top: 0, behavior: 'instant' }); }}
      />
    );
  }

  const top = rows.length ? Math.min(...rows.map((r) => r.ordem)) : 0;

  return (
    <>
      <div className="adm__new">
        <button type="button" className="btn btn--solid adm__newbtn" onClick={() => setEditing('new')}>+ Cadastrar novo produto</button>
        <p className="adm__help">Foto, nome, categoria, preço e tamanhos. Ao salvar, a peça entra na lista abaixo.</p>
      </div>
      <div className="adm__bar">
        <label className="select adm__search"><span>Buscar</span>
          <input type="search" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Nome ou categoria" />
        </label>
        <label className="select"><span>Mostrar</span>
          <select value={show} onChange={(e) => setShow(e.target.value)}>
            <option value="todas">Todas</option>
            <option value="escondidas">Escondidas do site</option>
            <option value="promocao">Em promoção</option>
            <option value="sempreco">Sem preço</option>
          </select>
        </label>
      </div>

      <ul className="adm__list">
        {shown.map((r) => (
          <li key={r.id} className={r.ativo ? '' : 'is-off'}>
            <img src={r.miniatura || r.foto} alt="" width={r.mini_w || undefined} height={r.mini_h || undefined} loading="lazy" decoding="async" />
            <div>
              <strong>{r.nome}</strong>
              <span>
                {r.genero} · {r.categoria || 'sem categoria'} ·{' '}
                {r.preco != null ? (r.preco_antigo != null ? `${brl(r.preco)} (antes ${brl(r.preco_antigo)})` : brl(r.preco)) : 'sem preço'}
                {r.tamanhos ? ` · tam. ${r.tamanhos.join(', ')}` : ' · tamanho a confirmar'}
              </span>
              {!r.ativo && <em>Escondida do site</em>}
              {r.preco_antigo != null && r.ativo && <em className="adm__tag-promo">Em promoção</em>}
              {r.destaque && r.ativo && <em>Promoção da semana</em>}
            </div>
            <div className="adm__row-actions">
              <button type="button" className="btn btn--line" onClick={() => setEditing(r)}>Editar</button>
              <button type="button" className="linkbtn" disabled={busyId === r.id} onClick={() => act(r, { ativo: !r.ativo, ...(r.ativo ? { destaque: false } : {}) }, r.ativo ? 'Peça escondida do site.' : 'Peça visível no site.')}>
                {r.ativo ? 'Esconder' : 'Mostrar'}
              </button>
              {r.ordem > top && (
                <button type="button" className="linkbtn" disabled={busyId === r.id} onClick={() => act(r, { ordem: top - 1 }, 'Peça foi para o início.')}>Ir para o início</button>
              )}
            </div>
          </li>
        ))}
      </ul>
      {rows.length > 0 && shown.length === 0 && <p className="empty">Nenhuma peça encontrada.</p>}
      {rows.length === 0 && <p className="empty">Nenhuma peça cadastrada ainda. Clique em "Cadastrar novo produto".</p>}
    </>
  );
}
