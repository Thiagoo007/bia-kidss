import { useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useCatalog } from '../catalog.jsx';
import ProductCard from '../components/ProductCard.jsx';
import usePage from '../components/usePage.js';
import { useFavorites } from '../favorites.js';
import { IconHeart } from '../components/Icons.jsx';

// Ignora acento e maiúscula na busca.
const fold = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const SIZES = [1, 2, 3, 4, 6, 8, 10, 12, 14, 16];

export default function Products() {
  usePage('Peças');
  const { products, departments, categories, promos } = useCatalog();
  const GENDERS = ['Tudo', ...departments];
  const [params, setParams] = useSearchParams();
  const gender = GENDERS.includes(params.get('para')) ? params.get('para') : 'Tudo';
  const size = Number(params.get('tam')) || 0;
  const cat = categories.some((c) => c.name === params.get('cat')) ? params.get('cat') : '';
  const promo = params.get('promo') === '1' && promos.length > 0;
  const [moreOpen, setMoreOpen] = useState(false);
  const fav = useFavorites();
  const onlyFav = params.get('fav') === '1' && fav.count > 0;
  const q = (params.get('q') || '').trim();
  const order = params.get('ord') === 'az' ? 'az' : '';
  const activeExtra = [cat, size > 0, promo, onlyFav, order].filter(Boolean).length;
  const shown = Math.min(products.length, Math.max(16, Number(params.get('n')) || 16));
  const showMore = () => {
    const next = new URLSearchParams(params);
    next.set('n', String(shown + 16));
    setParams(next, { replace: true });
  };

  const set = (k, v) => {
    const next = new URLSearchParams(params);
    if (!v || v === 'Tudo') next.delete(k);
    else next.set(k, v);
    next.delete('n');
    setParams(next, { replace: true });
  };

  const list = useMemo(() => {
    const term = fold(q);
    const found = products.filter(
      (p) => (gender === 'Tudo' || p.g === gender) && (!cat || p.cat === cat) && (!promo || p.discount > 0) && (!onlyFav || fav.has(p.id)) && (!size || (p.sizes && p.sizes.includes(size))) && (!term || fold(p.name).includes(term)),
    );
    return order === 'az' ? [...found].sort((a, b) => a.name.localeCompare(b.name, 'pt-BR')) : found;
  }, [products, gender, cat, promo, size, q, order, onlyFav, fav.ids]);

  return (
    <div className="page">
      <div className="page__head">
        <h1 className="h2">Todas as peças</h1>
        <span className="vh" aria-live="polite">{list.length} {list.length === 1 ? 'peça' : 'peças'}</span>
      </div>

      <div className="filters">
        <label className="select">
          <span>Buscar</span>
          <input type="search" value={params.get('q') || ''} placeholder="Ex.: vestido" onChange={(e) => set('q', e.target.value)} />
        </label>
        <div className="seg" role="group" aria-label="Para quem">
          {GENDERS.map((g) => (
            <button key={g} type="button" aria-pressed={gender === g} onClick={() => set('para', g)}>
              {g}
            </button>
          ))}
        </div>
        <button type="button" className="filters__toggle" aria-expanded={moreOpen} aria-controls="filters-more" onClick={() => setMoreOpen((v) => !v)}>
          {moreOpen ? 'Menos filtros' : 'Mais filtros'}{activeExtra > 0 && <span className="filters__badge">{activeExtra}</span>}
        </button>
        <div className={`filters__more${moreOpen ? ' is-open' : ''}`} id="filters-more">
        {categories.length > 1 && (
          <label className="select">
            <span>Categoria</span>
            <select value={cat} onChange={(e) => set('cat', e.target.value)}>
              <option value="">Todas</option>
              {categories.map((c) => <option key={c.slug} value={c.name}>{c.name}</option>)}
            </select>
          </label>
        )}
        <label className="select">
          <span>Tamanho</span>
          <select value={size || ''} onChange={(e) => set('tam', e.target.value)}>
            <option value="">Todos</option>
            {SIZES.map((s) => (
              <option key={s} value={s}>
                {s} {s === 1 ? 'ano' : 'anos'}
              </option>
            ))}
          </select>
        </label>
        <label className="select">
          <span>Ordem</span>
          <select value={order} onChange={(e) => set('ord', e.target.value)}>
            <option value="">Como a Bia mostra</option>
            <option value="az">Nome, de A a Z</option>
          </select>
        </label>
        {fav.count > 0 && (
          <button type="button" className={`tog tog--fav${onlyFav ? ' is-on' : ''}`} aria-pressed={onlyFav} onClick={() => set('fav', onlyFav ? '' : '1')}>
            <IconHeart filled={onlyFav} width={18} height={18} /> Favoritas ({fav.count})
          </button>
        )}
        {promos.length > 0 && (
          <button type="button" className={`tog${promo ? ' is-on' : ''}`} aria-pressed={promo} onClick={() => set('promo', promo ? '' : '1')}>
            Só promoções
          </button>
        )}
        </div>
      </div>

      {size > 0 && (
        <p className="hint">
          Mostrando só as peças com tamanho {size} confirmado. Nas demais, a Bia informa o tamanho no atendimento.{' '}
          <button type="button" className="linkbtn" onClick={() => set('tam', '')}>Ver todas</button>
        </p>
      )}

      {list.length === 0 ? (
        <p className="empty">
          Nenhuma peça com esse filtro.{' '}
          <button type="button" className="linkbtn" onClick={() => setParams({}, { replace: true })}>Limpar filtros</button>
        </p>
      ) : (
        <div className="grid">{list.slice(0, shown).map((p) => <ProductCard key={p.id} p={p} />)}</div>
      )}

      {list.length > shown && (
        <div className="more">
          <button type="button" className="btn btn--solid" onClick={showMore}>
            Ver mais peças ({list.length - shown})
          </button>
        </div>
      )}
    </div>
  );
}
