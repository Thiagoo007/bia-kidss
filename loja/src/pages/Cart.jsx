import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { photoProps } from '../data.js';
import { useContact, useCart } from '../cart.jsx';
import usePage from '../components/usePage.js';

export default function Cart() {
  usePage('Sacola');
  const { lines, count, message, setQty, setSize, remove, clear } = useCart();
  const { hasNumber, href: contactHref } = useContact();
  const [copied, setCopied] = useState(false);
  const [manual, setManual] = useState(false);
  const [sure, setSure] = useState(false);

  useEffect(() => {
    if (!copied) return undefined;
    const t = setTimeout(() => setCopied(false), 4000);
    return () => clearTimeout(t);
  }, [copied]);

  const pending = lines.filter((l) => l.product.sizes && l.product.sizes.length > 1 && !l.size).length;

  const send = async () => {
    if (hasNumber) return;
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setManual(false);
    } catch {
      setCopied(false);
      setManual(true);
    }
  };

  if (lines.length === 0) {
    return (
      <div className="page page--narrow">
        <h1 className="h2">Sua sacola</h1>
        <p className="empty">Nada por aqui ainda. Escolha as peças no catálogo.</p>
        <Link className="btn btn--solid" to="/produtos">Ver as peças</Link>
      </div>
    );
  }

  return (
    <div className="page">
      <div className="page__head">
        <h1 className="h2">Sua sacola</h1>
        <p className="page__sub">{count} {count === 1 ? 'item' : 'itens'}</p>
      </div>

      <div className="cart">
        <ul className="cart__list">
          {lines.map((l) => {
            const p = l.product;
            const multi = p.sizes && p.sizes.length > 1;
            return (
              <li key={`${p.id}-${l.size}`} className="row">
                <Link to={`/produto/${p.id}`} className="row__img" aria-hidden="true" tabIndex={-1}>
                  <img src={p.thumb} alt="" {...photoProps(p, 's')} loading="lazy" decoding="async" />
                </Link>
                <div className="row__body">
                  <Link to={`/produto/${p.id}`} className="row__name">{p.name}</Link>
                  {p.price && <p className="row__price">{p.price}</p>}
                  {p.sizes ? (
                    <label className="row__size">
                      <span>Tamanho</span>
                      <select value={l.size} onChange={(e) => setSize(p.id, l.size, e.target.value)}>
                        {multi && <option value="">Escolher tamanho</option>}
                        {p.sizes.map((s) => (
                          <option key={s} value={s}>{s} {s === 1 ? 'ano' : 'anos'}</option>
                        ))}
                      </select>
                    </label>
                  ) : (
                    <p className="row__ask">Tamanho a confirmar com a Bia</p>
                  )}
                </div>
                <div className="row__side">
                  <div className="qty" role="group" aria-label={`Quantidade de ${p.name}`}>
                    <button type="button" aria-label="Diminuir quantidade" onClick={() => setQty(p.id, l.size, l.qty - 1)}>−</button>
                    <output aria-live="polite">{l.qty}</output>
                    <button type="button" aria-label="Aumentar quantidade" onClick={() => setQty(p.id, l.size, l.qty + 1)}>+</button>
                  </div>
                  <button type="button" className="linkbtn" aria-label={`Remover ${p.name}`} onClick={() => remove(p.id, l.size)}>Remover</button>
                </div>
              </li>
            );
          })}
        </ul>

        <aside className="summary" aria-labelledby="sum-h">
          <h2 id="sum-h">Resumo</h2>
          <p>{count} {count === 1 ? 'peça' : 'peças'} na sacola. Os valores e o total são passados pela Bia no atendimento.</p>
          {pending > 0 && (
            <p className="hint">
              {pending} {pending === 1 ? 'peça está' : 'peças estão'} sem tamanho. Escolha agora ou deixe a Bia confirmar.
            </p>
          )}
          <a className="btn btn--solid" href={contactHref(message)} target="_blank" rel="noopener noreferrer" onClick={send}>
            {hasNumber ? 'Enviar pedido pelo WhatsApp' : 'Copiar pedido e abrir o direct'}
          </a>
          <p className="summary__hint" role="status">
            {copied
              ? 'Pedido copiado. Cole na conversa com a Bia.'
              : hasNumber
                ? 'A Bia confirma tamanho e estoque com você.'
                : 'Vamos copiar o pedido para você colar na conversa com a Bia.'}
          </p>
          {manual && (
            <label className="manual">
              <span>Não consegui copiar sozinho. Copie o texto abaixo e cole na conversa:</span>
              <textarea readOnly rows={6} value={message} onFocus={(e) => e.target.select()} />
            </label>
          )}
          <Link className="btn btn--ghost" to="/produtos">Continuar escolhendo</Link>
          {sure ? (
            <p className="hint">
              Tirar todas as peças da sacola?{' '}
              <button type="button" className="linkbtn" onClick={() => { clear(); setSure(false); }}>Sim, esvaziar</button>{' '}
              <button type="button" className="linkbtn" onClick={() => setSure(false)}>Cancelar</button>
            </p>
          ) : (
            <button type="button" className="linkbtn" onClick={() => setSure(true)}>Esvaziar sacola</button>
          )}
        </aside>
      </div>
    </div>
  );
}
