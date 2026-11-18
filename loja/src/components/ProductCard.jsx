import { memo, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { photoProps, priceBits, sizeLabel } from '../data.js';
import { useCartActions } from '../cart.jsx';
import { useFavorites } from '../favorites.js';
import { IconHeart } from './Icons.jsx';

function ProductCard({ p }) {
  const { add } = useCartActions();
  const navigate = useNavigate();
  const needsSize = Boolean(p.sizes && p.sizes.length > 1);
  const { old, off } = priceBits(p);
  const [added, setAdded] = useState(false);
  const fav = useFavorites();
  const liked = fav.has(p.id);

  useEffect(() => {
    if (!added) return undefined;
    const t = setTimeout(() => setAdded(false), 1600);
    return () => clearTimeout(t);
  }, [added]);

  const quick = () => {
    if (needsSize) { navigate(`/produto/${p.id}`); return; }
    add(p.id, p.sizes && p.sizes.length === 1 ? String(p.sizes[0]) : '');
    setAdded(true);
  };

  return (
    <article className="piece">
      <button type="button" className={`heart${liked ? ' is-on' : ''}`} aria-pressed={liked} aria-label={liked ? `Tirar ${p.name} das favoritas` : `Gostei: ${p.name}`} onClick={() => fav.toggle(p.id)}>
        <IconHeart filled={liked} width={20} height={20} />
      </button>
      <Link to={`/produto/${p.id}`} className="piece__link" aria-label={`Ver ${p.name}`}>
        <div className="piece__print">
          <img src={p.thumb} alt="" {...photoProps(p, 's')} loading="lazy" decoding="async" />
          {off > 0 && <span className="badge">-{off}%</span>}
        </div>
        <p className="piece__meta">{[p.g, p.cat].filter(Boolean).join(' · ')}</p>
        <h3 className="piece__name">{p.name}</h3>
        <p className="piece__price">
          {off > 0 && <s><span className="sr-only">De </span>{old}</s>}
          {p.price
            ? <b><span className="sr-only">{off > 0 ? 'por ' : ''}</span>{p.price}</b>
            : <span className="piece__ask">Valor pela Bia</span>}
        </p>
        <p className="piece__size">{sizeLabel(p)}</p>
      </Link>
      <button type="button" className={`btn btn--line${added ? ' is-added' : ''}`} onClick={quick}
        aria-label={`${needsSize ? 'Escolher tamanho' : 'Colocar na sacola'}: ${p.name}`}>
        {added ? 'Na sacola' : needsSize ? 'Escolher tamanho' : 'Colocar na sacola'}
      </button>
      <span className="sr-only" role="status">{added ? `${p.name} na sacola` : ''}</span>
    </article>
  );
}

export default memo(ProductCard);
