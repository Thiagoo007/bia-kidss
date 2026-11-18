import { useEffect, useMemo, useRef, useState } from 'react';
import { getClient } from './supabase.js';
import { AGES, DEPT_SUGGESTIONS, PHOTO_SPEC, errorText, fromPrice, pathOf, prepare, toPrice } from './lib.js';

const blank = { nome: '', genero: 'Meninas', categoria: '', tamanhos: [], tamanho_nota: '', preco: '', preco_antigo: '', ativo: true, destaque: false };

export default function ProductForm({ initial, rows, onClose, onSaved }) {
  const isNew = !initial;
  const [f, setF] = useState(() => (initial
    ? {
      nome: initial.nome,
      genero: initial.genero,
      categoria: initial.categoria || '',
      tamanhos: initial.tamanhos || [],
      tamanho_nota: initial.tamanho_nota || '',
      preco: fromPrice(initial.preco),
      preco_antigo: fromPrice(initial.preco_antigo),
      ativo: initial.ativo,
      destaque: initial.destaque,
    }
    : blank));
  const [file, setFile] = useState(null);
  const [img, setImg] = useState(null); // foto já no padrão (cheia e miniatura)
  const [photoBusy, setPhotoBusy] = useState(false);
  const [preview, setPreview] = useState(initial ? initial.miniatura || initial.foto : '');
  const [erro, setErro] = useState('');
  const [busy, setBusy] = useState(false);
  const [sure, setSure] = useState(false);
  const again = useRef(false);
  const top = useRef(null);

  const cats = useMemo(() => [...new Set(rows.map((r) => r.categoria).filter(Boolean))].sort((a, b) => a.localeCompare(b, 'pt-BR')), [rows]);
  const depts = useMemo(() => [...new Set([...DEPT_SUGGESTIONS, ...rows.map((r) => r.genero)])], [rows]);

  useEffect(() => { top.current?.scrollIntoView({ block: 'start' }); }, []);
  useEffect(() => () => { if (preview.startsWith('blob:')) URL.revokeObjectURL(preview); }, [preview]);

  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const toggleAge = (n) => set('tamanhos', f.tamanhos.includes(n) ? f.tamanhos.filter((a) => a !== n) : [...f.tamanhos, n].sort((a, b) => a - b));
  const pick = async (e) => {
    const x = e.target.files && e.target.files[0];
    e.target.value = '';
    if (!x) return;
    setErro('');
    setPhotoBusy(true);
    try {
      const prepared = await prepare(x);
      setFile(x);
      setImg(prepared);
      setPreview(URL.createObjectURL(prepared.full.blob));
    } catch (err) {
      setErro(err && err.small
        ? `Esta foto é pequena demais (o lado menor precisa ter pelo menos ${PHOTO_SPEC.minSide} px). Tire a foto de novo, com a câmera do celular, em vez de usar uma cópia reduzida.`
        : 'Não consegui abrir esta foto. Escolha outra (JPG ou PNG).');
    }
    setPhotoBusy(false);
  };

  const preco = toPrice(f.preco);
  const antigo = toPrice(f.preco_antigo);
  const off = preco && antigo && antigo > preco ? Math.round((1 - preco / antigo) * 100) : 0;

  const save = async (e) => {
    e.preventDefault();
    setErro('');
    if (!f.nome.trim()) return setErro('Escreva o nome da peça.');
    if (!f.genero.trim()) return setErro('Escolha para quem é a peça (Meninas, Meninos...).');
    if (isNew && !img) return setErro('Escolha a foto da peça.');
    if (photoBusy) return setErro('Aguarde: a foto ainda está sendo preparada.');
    if (Number.isNaN(preco) || Number.isNaN(antigo)) return setErro('O preço não parece certo. Escreva só números, por exemplo 112,00.');
    if (antigo != null && preco == null) return setErro('Para mostrar o desconto, preencha também o preço atual.');
    if (antigo != null && antigo <= preco) return setErro('O "preço de antes" precisa ser maior que o preço atual. Deixe em branco se não há desconto.');
    setBusy(true);
    try {
      const c = await getClient();
      const row = {
        nome: f.nome.trim(),
        genero: f.genero.trim(),
        categoria: f.categoria.trim() || null,
        tamanhos: f.tamanhos.length ? f.tamanhos : null,
        tamanho_nota: f.tamanho_nota.trim() || null,
        preco,
        preco_antigo: antigo,
        ativo: f.ativo,
        destaque: f.destaque && f.ativo,
      };
      const oldPaths = [];
      if (img) {
        const name = crypto.randomUUID();
        const up = async (blob, path) => {
          const { error } = await c.storage.from('fotos').upload(path, blob, { contentType: 'image/jpeg', cacheControl: '31536000' });
          if (error) throw error;
          return c.storage.from('fotos').getPublicUrl(path).data.publicUrl;
        };
        row.foto = await up(img.full.blob, `${name}.jpg`);
        row.miniatura = await up(img.thumb.blob, `${name}-m.jpg`);
        Object.assign(row, { foto_w: img.full.w, foto_h: img.full.h, mini_w: img.thumb.w, mini_h: img.thumb.h });
        if (initial) oldPaths.push(pathOf(initial.foto), pathOf(initial.miniatura));
      }
      let id = initial && initial.id;
      if (isNew) {
        row.ordem = rows.length ? Math.min(...rows.map((r) => r.ordem)) - 1 : 0;
        const { data, error } = await c.from('produtos').insert(row).select('id').single();
        if (error) throw error;
        id = data.id;
      } else {
        const { error } = await c.from('produtos').update(row).eq('id', id);
        if (error) throw error;
      }
      if (row.destaque) await c.from('produtos').update({ destaque: false }).neq('id', id);
      const gone = oldPaths.filter(Boolean);
      if (gone.length) await c.storage.from('fotos').remove(gone);
      onSaved(isNew ? (again.current ? 'Peça cadastrada. Pode cadastrar a próxima.' : 'Peça cadastrada.') : 'Alterações salvas.', again.current);
    } catch (err) {
      setErro(errorText(err));
      setBusy(false);
    }
  };

  const remove = async () => {
    setBusy(true);
    try {
      const c = await getClient();
      const { error } = await c.from('produtos').delete().eq('id', initial.id);
      if (error) throw error;
      const gone = [pathOf(initial.foto), pathOf(initial.miniatura)].filter(Boolean);
      if (gone.length) await c.storage.from('fotos').remove(gone);
      onSaved('Peça excluída.');
    } catch {
      setErro('Não consegui excluir. Tente de novo.');
      setBusy(false);
    }
  };

  return (
    <form className="adm__form" onSubmit={save} ref={top}>
      <h2 className="h3">{isNew ? 'Cadastrar novo produto' : 'Editar peça'}</h2>

      <div className="adm__field">
        <span>Foto</span>
        <div className="adm__photo">
          {preview ? <img src={preview} alt="Foto da peça" /> : <p>{photoBusy ? 'Preparando a foto…' : 'Nenhuma foto ainda'}</p>}
        </div>
        <label className="btn btn--line adm__pick">
          {preview ? 'Trocar a foto' : 'Escolher a foto'}
          <input type="file" accept="image/*" onChange={pick} />
        </label>
        <small>
          Padrão das fotos da loja: tire a peça em pé (na vertical), inteira, em fundo limpo e sem texto por cima.
          O painel ajusta sozinho para o mesmo formato (3:4) e a mesma qualidade de todas as outras, sem cortar nada.
          O que você vê acima já é como vai aparecer.
        </small>
      </div>

      <label className="adm__field"><span>Nome da peça</span>
        <input type="text" value={f.nome} onChange={(e) => set('nome', e.target.value)} placeholder="Ex.: Vestido rosa com laço" maxLength={90} />
      </label>

      <label className="adm__field"><span>Para quem</span>
        <input type="text" list="adm-depts" value={f.genero} onChange={(e) => set('genero', e.target.value)} placeholder="Meninas, Meninos, Bebês..." maxLength={30} />
        <datalist id="adm-depts">{depts.map((d) => <option key={d} value={d} />)}</datalist>
        <small>Escolha uma da lista ou escreva uma nova (por exemplo, Bebês). Ela aparece sozinha no menu do site.</small>
      </label>

      <label className="adm__field"><span>Categoria</span>
        <input type="text" list="adm-cats" value={f.categoria} onChange={(e) => set('categoria', e.target.value)} placeholder="Ex.: Vestidos, Conjuntos, Calçados..." maxLength={40} />
        <datalist id="adm-cats">{cats.map((c) => <option key={c} value={c} />)}</datalist>
        <small>Escolha uma da lista ou escreva uma nova: ela aparece sozinha no menu e na página inicial. Sem categoria, a peça vai para "Outras peças".</small>
      </label>

      <div className="adm__pair">
        <label className="adm__field"><span>Preço atual (R$)</span>
          <input type="text" inputMode="decimal" value={f.preco} onChange={(e) => set('preco', e.target.value)} placeholder="Ex.: 112,00" />
        </label>
        <label className="adm__field"><span>Preço de antes (R$)</span>
          <input type="text" inputMode="decimal" value={f.preco_antigo} onChange={(e) => set('preco_antigo', e.target.value)} placeholder="Só se tem desconto" />
        </label>
      </div>
      <small className="adm__note">
        {off > 0 ? `Vai aparecer como promoção: de R$ ${f.preco_antigo} por R$ ${f.preco} (-${off}%).` : 'Preço em branco: o cliente pergunta o valor pelo WhatsApp. Para dar desconto, preencha o "preço de antes" com o valor mais alto.'}
      </small>

      <fieldset className="adm__field">
        <legend>Tamanhos disponíveis (idade em anos)</legend>
        <div className="sizes__row">
          {AGES.map((n) => (
            <label key={n} className="chip">
              <input type="checkbox" checked={f.tamanhos.includes(n)} onChange={() => toggleAge(n)} />
              <span>{n}</span>
            </label>
          ))}
        </div>
        <small>Não marque nenhum se o tamanho ainda precisa ser confirmado.</small>
      </fieldset>

      <label className="adm__field"><span>Observação do tamanho (opcional)</span>
        <input type="text" value={f.tamanho_nota} onChange={(e) => set('tamanho_nota', e.target.value)} placeholder="Ex.: M e 2 anos" maxLength={40} />
      </label>

      <label className="adm__check"><input type="checkbox" checked={f.ativo} onChange={(e) => set('ativo', e.target.checked)} />
        <span>Aparece no site <small>Desmarque para esconder (por exemplo, acabou o estoque).</small></span>
      </label>
      <label className="adm__check"><input type="checkbox" checked={f.destaque} onChange={(e) => set('destaque', e.target.checked)} />
        <span>Promoção da semana <small>Aparece em destaque na página inicial. Só uma peça por vez.</small></span>
      </label>

      {erro && <p className="hint" role="alert">{erro}</p>}

      <div className="adm__actions">
        <button type="submit" className="btn btn--solid" disabled={busy} onClick={() => { again.current = false; }}>{busy ? 'Salvando…' : isNew ? 'Salvar produto' : 'Salvar'}</button>
        {isNew && <button type="submit" className="btn btn--line adm__again" disabled={busy} onClick={() => { again.current = true; }}>Salvar e cadastrar outro</button>}
        <button type="button" className="btn btn--ghost" onClick={onClose} disabled={busy}>Cancelar</button>
      </div>

      {!isNew && (sure ? (
        <p className="hint">
          Excluir esta peça de vez? Não dá para desfazer.{' '}
          <button type="button" className="linkbtn" onClick={remove} disabled={busy}>Sim, excluir</button>{' '}
          <button type="button" className="linkbtn" onClick={() => setSure(false)}>Não</button>
        </p>
      ) : (
        <button type="button" className="linkbtn adm__del" onClick={() => setSure(true)}>Excluir esta peça</button>
      ))}
    </form>
  );
}
