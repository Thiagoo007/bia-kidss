import { useSyncExternalStore } from 'react';

// Peças que a cliente marcou com coração ("gostei"). Fica só neste aparelho.
const KEY = 'bia-kidss:favoritas:v1';
const listeners = new Set();
let cache = null;

const read = () => {
  if (cache) return cache;
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    cache = new Set(Array.isArray(raw) ? raw.map(Number).filter(Number.isFinite) : []);
  } catch {
    cache = new Set();
  }
  return cache;
};
const emit = () => listeners.forEach((l) => l());
const subscribe = (l) => {
  listeners.add(l);
  const onStorage = (e) => { if (e.key === KEY) { cache = null; l(); } };
  window.addEventListener('storage', onStorage);
  return () => { listeners.delete(l); window.removeEventListener('storage', onStorage); };
};
// Cada mudança cria um Set novo, para o React perceber.
const getSnapshot = () => read();

export const toggleFavorite = (id) => {
  const next = new Set(read());
  const n = Number(id);
  if (next.has(n)) next.delete(n); else next.add(n);
  cache = next;
  try { localStorage.setItem(KEY, JSON.stringify([...next])); } catch { /* sem armazenamento: vale só nesta visita */ }
  emit();
};

export function useFavorites() {
  const ids = useSyncExternalStore(subscribe, getSnapshot, () => new Set());
  return { ids, count: ids.size, has: (id) => ids.has(Number(id)), toggle: toggleFavorite };
}
