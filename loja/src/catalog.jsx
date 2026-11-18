import { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { DEFAULT_SETTINGS, PRODUCTS, slug } from './data.js';
import { fetchCatalog, fetchSettings, isLive } from './supabase.js';

const KEY = 'bia-kidss:catalogo:v2';
const SKEY = 'bia-kidss:config:v1';
const DEPT_ORDER = ['Meninas', 'Meninos'];
const byDept = (a, b) => {
  const ia = DEPT_ORDER.includes(a) ? DEPT_ORDER.indexOf(a) : 9;
  const ib = DEPT_ORDER.includes(b) ? DEPT_ORDER.indexOf(b) : 9;
  return ia - ib || a.localeCompare(b, 'pt-BR');
};
const CatalogCtx = createContext(null);

function cached() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || 'null');
    return Array.isArray(raw) && raw.length ? raw : null;
  } catch {
    return null;
  }
}

function cachedSettings() {
  try {
    return JSON.parse(localStorage.getItem(SKEY) || 'null') || {};
  } catch {
    return {};
  }
}

// Valores da Bia por cima dos de partida; campo vazio volta ao padrão (menos avisos, que podem ficar vazios).
const mergeSettings = (db) => {
  const out = { ...DEFAULT_SETTINGS };
  Object.entries(db || {}).forEach(([k, v]) => {
    if (v === undefined || v === null) return;
    if (k === 'aviso' || k === 'aviso_link') out[k] = String(v);
    else if (k === 'faq') { if (Array.isArray(v)) out.faq = v; }
    else if (String(v).trim() !== '' || k === 'local_loja') out[k] = v;
  });
  return out;
};

export function CatalogProvider({ children }) {
  // Conectado: começa pelo último catálogo visto (ou pelo de data.js) e troca pelo atual assim que chega.
  const [products, setProducts] = useState(() => (isLive ? cached() || PRODUCTS : PRODUCTS));
  const [ready, setReady] = useState(!isLive || Boolean(cached()));
  const [settings, setSettings] = useState(() => mergeSettings(isLive ? cachedSettings() : {}));

  useEffect(() => {
    if (!isLive) return undefined;
    const ctl = new AbortController();
    fetchCatalog(ctl.signal)
      .then((list) => {
        setProducts(list);
        try { localStorage.setItem(KEY, JSON.stringify(list)); } catch { /* sem armazenamento */ }
      })
      .catch(() => { /* mantém o que já está na tela */ })
      .finally(() => setReady(true));
    fetchSettings(ctl.signal)
      .then((db) => {
        setSettings(mergeSettings(db));
        try { localStorage.setItem(SKEY, JSON.stringify(db)); } catch { /* sem armazenamento */ }
      })
      .catch(() => { /* mantém os valores atuais */ });
    return () => ctl.abort();
  }, []);

  const value = useMemo(() => {
    const map = new Map();
    products.forEach((p) => {
      const c = map.get(p.cat) || { name: p.cat, slug: slug(p.cat), count: 0, sample: p };
      c.count += 1;
      map.set(p.cat, c);
    });
    return {
      products,
      ready,
      settings,
      departments: [...new Set(products.map((p) => p.g))].sort(byDept),
      live: isLive,
      byId: (id) => products.find((p) => p.id === Number(id)),
      categories: [...map.values()].sort((a, b) => b.count - a.count || a.name.localeCompare(b.name, 'pt-BR')),
      promos: products.filter((p) => p.discount > 0),
    };
  }, [products, ready, settings]);
  return <CatalogCtx.Provider value={value}>{children}</CatalogCtx.Provider>;
}

export const useCatalog = () => useContext(CatalogCtx);
