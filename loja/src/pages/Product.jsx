import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { photoProps, priceBits, sizeLabel } from '../data.js';
import { useContact, useCart } from '../cart.jsx';
import { useCatalog } from '../catalog.jsx';
import ProductCard from '../components/ProductCard.jsx';
import usePage from '../components/usePage.js';
import { useFavorites } from '../favorites.js';
import { IconHeart } from '../components/Icons.jsx';
import NotFound from './NotFound.jsx';

export default function Product() {
  const { id } = useParams();
  const { products, ready, byId } = useCatalog();
  const p = byId(id);
  const { add, count } = useCart();
  const { href: contactHref } = useContact();
  const [size, setSize] = useState('');
  const [added, setAdded] = useState(false);
  const fav = useFavorites();
  const liked = p ? fav.has(p.id) : false;
  usePage(p ? p.name : 'Peça não encontrada');

  useEffect(() => {
    setSize(p && p.sizes && p.sizes.length === 1 ? String(p.sizes[0]) : '');
    setAdded(false);
  }, [p]);

  if (!p) return ready ? <NotFound /> : null;

  const needsSize = Boolean(p.sizes && p.sizes.length > 1);
  const ask = `Olá, Bia! Quero saber mais sobre: ${p.name}.`;
  const { price, old, off } = priceBits(p);
  const related = products.filter((x) => x.g === p.g && x.id !== p.id).slice(0, 4);

  const submit = () => {
    add(p.id, size);
    setAdded(true);
  };

  return (
    <div className="page">
      <nav className="crumbs" aria-label="Você está em">
        <Link to="/produtos">Peças</Link> <span aria-hidden="true">/</span> <Link to={`/produtos?para=${p.g}`}>{p.g}</Link>
      </nav>

      <div className="pdp">
        <div className="pdp__photo">
          <img src={p.photo} alt={p.name} {...photoProps(p)} fetchPriority="high" decoding="async" />
        </div>

        <div className="pdp__info">
          <div className="pdp__title">
            <h1 className="h2">{p.name}</h1>
            <button type="button" className={`like${liked ? ' is-on' : ''}`} aria-pressed={liked} onClick={() => fav.toggle(p.id)}>
              <IconHeart filled={liked} width={20} height={20} /> {liked ? 'Gostei' : 'Gostei?'}
            </button>
          </div>
          {price ? (
            <p className="pdp__price">
              {old && <s className="pdp__old"><span className="sr-only">De </span>{old}</s>}
              <b>{old && <span className="sr-only">por </span>}{price}</b>
              {off > 0 && <span className="badge badge--inline">-{off}%</span>}
            </p>
          ) : (
            <p className="pdp__price">Valor pelo atendimento da Bia</p>
          )}

          {p.sizes ? (
            <fieldset className="sizes">
              <legend>{needsSize ? 'Escolha o tamanho (em anos)' : 'Tamanho (em anos)'}</legend>
              <div className="sizes__row">
                {p.sizes.map((s) => (
                  <label key={s} className="chip">
                    <input type="radio" name="tam" value={s} checked={size === String(s)} onChange={() => setSize(String(s))} />
                    <span>{s}</span>
                  </label>
                ))}
              </div>
              {p.sizeNote && !/^[\d\s,a]+$/.test(p.sizeNote) && <p className="sizes__note">{sizeLabel(p)}</p>}
            </fieldset>
          ) : (
            <p className="sizes__note">Os tamanhos disponíveis são confirmados pela Bia no atendimento.</p>
          )}

          <div className="pdp__cta">
            <button type="button" className="btn btn--solid" onClick={submit} disabled={needsSize && !size}>
              {added ? 'Colocar mais uma' : 'Colocar na sacola'}
            </button>
            <a className="btn btn--ghost" href={contactHref(ask)} target="_blank" rel="noopener noreferrer">Perguntar à Bia</a>
          </div>
          {needsSize && !size && <p className="hint">Escolha um tamanho para colocar na sacola.</p>}
          {added && (
            <p className="hint" role="status">
              Na sacola. <Link className="linkbtn" to="/sacola">Ver sacola ({count})</Link>
              <Link className="linkbtn" to="/produtos">Continuar escolhendo</Link>
            </p>
          )}

          <dl className="facts">
            <div><dt>Para</dt><dd>{p.g}</dd></div>
            <div><dt>Entrega</dt><dd>Entrega ou retirada combinada com a Bia</dd></div>
            <div><dt>Pedido</dt><dd>A Bia confirma tamanho e estoque antes de fechar</dd></div>
          </dl>
        </div>
      </div>

      <section className="related" aria-labelledby="rel-h">
        <h2 id="rel-h">Também em {p.g.toLowerCase()}</h2>
        <div className="grid">{related.map((r) => <ProductCard key={r.id} p={r} />)}</div>
      </section>
    </div>
  );
}
