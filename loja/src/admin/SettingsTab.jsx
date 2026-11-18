import { useState } from 'react';
import { DEFAULT_SETTINGS } from './defaults.js';
import { getClient } from './supabase.js';
import { errorText } from './lib.js';

const digits = (t) => String(t || '').replace(/\D/g, '');
// Aceita "(61) 99647-5818" ou "5561996475818"; guarda com 55 na frente.
const normPhone = (t) => {
  const d = digits(t);
  if (!d) return '';
  return d.length <= 11 ? `55${d}` : d;
};
const showPhone = (t) => {
  const d = digits(t).replace(/^55/, '');
  return d.length === 11 ? `(${d.slice(0, 2)}) ${d.slice(2, 7)}-${d.slice(7)}` : d.length === 10 ? `(${d.slice(0, 2)}) ${d.slice(2, 6)}-${d.slice(6)}` : d;
};

export default function SettingsTab({ settings, reload, notify }) {
  const start = { ...DEFAULT_SETTINGS, ...settings };
  const [f, setF] = useState({
    whatsapp: showPhone(start.whatsapp),
    instagram: start.instagram || '',
    aviso: start.aviso || '',
    aviso_link: start.aviso_link || '',
    hero_titulo: start.hero_titulo || '',
    hero_texto: start.hero_texto || '',
    local_atende: start.local_atende || '',
    local_loja: start.local_loja || '',
    endereco_loja: start.endereco_loja || '',
  });
  const [faq, setFaq] = useState(() => (start.faq || []).map((x) => ({ q: x.q, a: x.a })));
  const [busy, setBusy] = useState(false);
  const [erro, setErro] = useState('');

  const set = (k, v) => setF((x) => ({ ...x, [k]: v }));
  const setItem = (i, k, v) => setFaq((l) => l.map((x, n) => (n === i ? { ...x, [k]: v } : x)));
  const move = (i, d) => setFaq((l) => {
    const j = i + d;
    if (j < 0 || j >= l.length) return l;
    const next = [...l];
    [next[i], next[j]] = [next[j], next[i]];
    return next;
  });

  const save = async (e) => {
    e.preventDefault();
    setErro('');
    const phone = normPhone(f.whatsapp);
    if (phone && (phone.length < 12 || phone.length > 13)) return setErro('O WhatsApp parece incompleto. Escreva com o DDD, por exemplo (61) 99647-5818.');
    let insta = f.instagram.trim();
    if (insta && !/^https?:\/\//i.test(insta)) insta = `https://www.instagram.com/${insta.replace(/^@/, '')}`;
    const cleanFaq = faq.map((x) => ({ q: x.q.trim(), a: x.a.trim() })).filter((x) => x.q && x.a);
    setBusy(true);
    try {
      const c = await getClient();
      const dados = {
        whatsapp: phone,
        instagram: insta,
        aviso: f.aviso.trim(),
        aviso_link: f.aviso_link.trim(),
        hero_titulo: f.hero_titulo.trim(),
        hero_texto: f.hero_texto.trim(),
        local_atende: f.local_atende.trim(),
        local_loja: f.local_loja.trim(),
        endereco_loja: f.endereco_loja.trim(),
        faq: cleanFaq,
      };
      const { error } = await c.from('configuracoes').upsert({ id: 1, dados, atualizado_em: new Date().toISOString() });
      if (error) throw error;
      notify('Configurações salvas. O site já mostra as mudanças.');
      await reload();
    } catch (err) {
      setErro(errorText(err));
    }
    setBusy(false);
  };

  return (
    <form className="adm__form adm__form--wide" onSubmit={save}>
      <section className="adm__group">
        <h2 className="h3">Contato</h2>
        <label className="adm__field"><span>WhatsApp da loja</span>
          <input type="text" inputMode="tel" value={f.whatsapp} onChange={(e) => set('whatsapp', e.target.value)} placeholder="(61) 99999-9999" />
          <small>Com DDD. É para esse número que os pedidos da sacola vão. Em branco, o pedido vai pelo direct do Instagram.</small>
        </label>
        <label className="adm__field"><span>Instagram</span>
          <input type="text" value={f.instagram} onChange={(e) => set('instagram', e.target.value)} placeholder="@bia_kidss26" />
        </label>
      </section>

      <section className="adm__group">
        <h2 className="h3">Aviso no topo do site</h2>
        <label className="adm__field"><span>Texto do aviso</span>
          <input type="text" value={f.aviso} onChange={(e) => set('aviso', e.target.value)} placeholder="Ex.: Semana de promoção: até 30% off em vestidos!" maxLength={120} />
          <small>Aparece numa faixa colorida acima do menu, em todas as páginas. Deixe em branco para esconder.</small>
        </label>
        <label className="adm__field"><span>Link do aviso (opcional)</span>
          <input type="text" value={f.aviso_link} onChange={(e) => set('aviso_link', e.target.value)} placeholder="/produtos?promo=1" />
          <small>Para levar ao clicar. Exemplos: /produtos?promo=1 (promoções) ou /produtos?cat=Vestidos.</small>
        </label>
      </section>

      <section className="adm__group">
        <h2 className="h3">Página inicial</h2>
        <label className="adm__field"><span>Título principal</span>
          <input type="text" value={f.hero_titulo} onChange={(e) => set('hero_titulo', e.target.value)} maxLength={90} />
        </label>
        <label className="adm__field"><span>Texto abaixo do título</span>
          <textarea rows={3} value={f.hero_texto} onChange={(e) => set('hero_texto', e.target.value)} maxLength={220} />
        </label>
      </section>

      <section className="adm__group">
        <h2 className="h3">Onde a loja fica</h2>
        <label className="adm__field"><span>Onde a Bia atende</span>
          <input type="text" value={f.local_atende} onChange={(e) => set('local_atende', e.target.value)} placeholder="Brasília, DF" />
        </label>
        <label className="adm__field"><span>Loja física (opcional)</span>
          <input type="text" value={f.local_loja} onChange={(e) => set('local_loja', e.target.value)} placeholder="Mansidão, BA" />
          <small>Aparece no rodapé e na página de contato.</small>
        </label>
        <label className="adm__field"><span>Endereço completo da loja física (opcional)</span>
          <input type="text" value={f.endereco_loja} onChange={(e) => set('endereco_loja', e.target.value)} placeholder="Rua, número, bairro, cidade, CEP" />
          <small>Aparece na página de contato, com o botão "Ver no mapa".</small>
        </label>
      </section>

      <section className="adm__group">
        <h2 className="h3">Dúvidas frequentes</h2>
        <p className="adm__help">Aparecem na página "Como comprar". Use para troca, pagamento, entrega, prazo, medidas... A ordem aqui é a ordem no site.</p>
        <ul className="adm__faq">
          {faq.map((x, i) => (
            <li key={i}>
              <label className="adm__field"><span>Pergunta</span>
                <input type="text" value={x.q} onChange={(e) => setItem(i, 'q', e.target.value)} maxLength={120} />
              </label>
              <label className="adm__field"><span>Resposta</span>
                <textarea rows={3} value={x.a} onChange={(e) => setItem(i, 'a', e.target.value)} maxLength={600} />
              </label>
              <div className="adm__row-actions">
                <button type="button" className="linkbtn" onClick={() => move(i, -1)} disabled={i === 0}>Subir</button>
                <button type="button" className="linkbtn" onClick={() => move(i, 1)} disabled={i === faq.length - 1}>Descer</button>
                <button type="button" className="linkbtn adm__del" onClick={() => setFaq((l) => l.filter((_, n) => n !== i))}>Remover</button>
              </div>
            </li>
          ))}
        </ul>
        <button type="button" className="btn btn--line adm__add" onClick={() => setFaq((l) => [...l, { q: '', a: '' }])}>Adicionar pergunta</button>
      </section>

      {erro && <p className="hint" role="alert">{erro}</p>}
      <div className="adm__actions">
        <button type="submit" className="btn btn--solid" disabled={busy}>{busy ? 'Salvando…' : 'Salvar configurações'}</button>
      </div>
    </form>
  );
}
