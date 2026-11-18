import { useMemo, useState } from 'react';
import { errorText } from './lib.js';
import { getClient } from './supabase.js';

// Renomeia uma categoria (ou departamento) em todas as peças de uma vez.
function Group({ title, help, column, items, reload, notify, empty }) {
  const [editing, setEditing] = useState(null);
  const [name, setName] = useState('');
  const [busy, setBusy] = useState(false);

  const start = (n) => { setEditing(n); setName(n === empty ? '' : n); };
  const save = async (old) => {
    const next = name.trim();
    if (!next || next === old) { setEditing(null); return; }
    setBusy(true);
    try {
      const c = await getClient();
      let q = c.from('produtos').update({ [column]: next });
      q = old === empty ? q.is(column, null) : q.eq(column, old);
      const { error } = await q;
      if (error) throw error;
      notify(`"${old}" agora se chama "${next}" em todas as peças.`);
      setEditing(null);
      await reload();
    } catch (err) {
      notify(errorText(err), true);
    }
    setBusy(false);
  };

  return (
    <section className="adm__group" aria-label={title}>
      <h2 className="h3">{title}</h2>
      <p className="adm__help">{help}</p>
      <ul className="adm__cats">
        {items.map(([n, count]) => (
          <li key={n}>
            {editing === n ? (
              <form onSubmit={(e) => { e.preventDefault(); save(n); }} className="adm__rename">
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} maxLength={40} aria-label={`Novo nome para ${n}`} autoFocus />
                <button type="submit" className="btn btn--solid" disabled={busy}>Salvar</button>
                <button type="button" className="btn btn--ghost" onClick={() => setEditing(null)}>Cancelar</button>
              </form>
            ) : (
              <>
                <span><strong>{n}</strong> <small>{count} {count === 1 ? 'peça' : 'peças'}</small></span>
                <button type="button" className="linkbtn" onClick={() => start(n)}>{n === empty ? 'Dar um nome' : 'Renomear'}</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </section>
  );
}

export default function CategoriesTab({ rows, reload, notify }) {
  const cats = useMemo(() => {
    const m = new Map();
    rows.forEach((r) => { const k = r.categoria || 'Sem categoria'; m.set(k, (m.get(k) || 0) + 1); });
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);
  const depts = useMemo(() => {
    const m = new Map();
    rows.forEach((r) => m.set(r.genero, (m.get(r.genero) || 0) + 1));
    return [...m.entries()].sort((a, b) => b[1] - a[1]);
  }, [rows]);

  return (
    <>
      <Group
        title="Categorias"
        help="Para criar uma categoria nova, escreva o nome dela ao cadastrar ou editar uma peça. Aqui você troca o nome de uma categoria em todas as peças de uma vez. A categoria some do menu sozinha quando não sobra nenhuma peça nela."
        column="categoria"
        items={cats}
        empty="Sem categoria"
        reload={reload}
        notify={notify}
      />
      <Group
        title="Para quem (departamentos)"
        help="Meninas, Meninos, Bebês... Aparecem no menu e nos filtros do site."
        column="genero"
        items={depts}
        empty="__nenhum__"
        reload={reload}
        notify={notify}
      />
    </>
  );
}
