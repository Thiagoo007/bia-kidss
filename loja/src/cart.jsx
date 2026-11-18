import { createContext, useCallback, useContext, useEffect, useMemo, useState } from 'react';
import { instagramHandle } from './data.js';
import { useCatalog } from './catalog.jsx';

const KEY = 'bia-kidss:sacola:v1';
const CartCtx = createContext(null);
const CartActionsCtx = createContext(null);

function load() {
  try {
    const raw = JSON.parse(localStorage.getItem(KEY) || '[]');
    if (!Array.isArray(raw)) return [];
    return raw
      .filter((i) => i && Number.isFinite(Number(i.id)))
      .map((i) => ({ id: Number(i.id), size: String(i.size ?? ''), qty: Math.min(20, Math.max(1, Math.floor(Number(i.qty)) || 1)) }));
  } catch {
    return [];
  }
}

export function CartProvider({ children }) {
  const { products, ready } = useCatalog();
  const [items, setItems] = useState(load);

  // Quando o catálogo chega: tira da sacola peça que saiu da loja e tamanho que não existe mais.
  useEffect(() => {
    if (!ready) return;
    setItems((list) => {
      const next = [];
      list.forEach((i) => {
        const p = products.find((x) => x.id === i.id);
        if (!p) return;
        const size = !i.size || (p.sizes && p.sizes.map(String).includes(i.size)) ? i.size : '';
        const twin = next.find((n) => n.id === i.id && n.size === size);
        if (twin) twin.qty = Math.min(20, twin.qty + i.qty);
        else next.push({ ...i, size });
      });
      return JSON.stringify(next) === JSON.stringify(list) ? list : next;
    });
  }, [products, ready]);

  useEffect(() => {
    try { localStorage.setItem(KEY, JSON.stringify(items)); } catch { /* sem armazenamento */ }
  }, [items]);

  const add = useCallback((id, size = '') => {
    setItems((list) => {
      const hit = list.find((i) => i.id === id && i.size === size);
      if (hit) return list.map((i) => (i === hit ? { ...i, qty: Math.min(20, i.qty + 1) } : i));
      return [...list, { id, size, qty: 1 }];
    });
  }, []);

  const setQty = useCallback((id, size, qty) => {
    setItems((list) => list.flatMap((i) => (i.id === id && i.size === size ? (qty < 1 ? [] : [{ ...i, qty: Math.min(qty, 20) }]) : [i])));
  }, []);

  const setSize = useCallback((id, from, to) => {
    setItems((list) => {
      const moving = list.find((i) => i.id === id && i.size === from);
      if (!moving) return list;
      const rest = list.filter((i) => i !== moving);
      const twin = rest.find((i) => i.id === id && i.size === to);
      if (twin) return rest.map((i) => (i === twin ? { ...i, qty: i.qty + moving.qty } : i));
      return list.map((i) => (i === moving ? { ...i, size: to } : i));
    });
  }, []);

  const remove = useCallback((id, size) => setItems((list) => list.filter((i) => !(i.id === id && i.size === size))), []);
  const clear = useCallback(() => setItems([]), []);

  const actions = useMemo(() => ({ add, setQty, setSize, remove, clear }), [add, setQty, setSize, remove, clear]);

  const value = useMemo(() => {
    const lines = items.flatMap((i) => {
      const product = products.find((p) => p.id === i.id);
      return product ? [{ ...i, product }] : [];
    });
    const count = lines.reduce((n, l) => n + l.qty, 0);
    const message = `Olá, Bia! Quero estas peças:\n${lines
      .map((l) => `- ${l.qty > 1 ? l.qty + 'x ' : ''}${l.product.name} (cód. ${l.product.id}, ${l.size ? 'tam. ' + l.size : 'tamanho a confirmar'})`)
      .join('\n')}\nTotal: ${count} ${count === 1 ? 'peça' : 'peças'}.\nÉ entrega ou retirada?`;
    return { items, lines, count, message, add, setQty, setSize, remove, clear };
  }, [items, products, add, setQty, setSize, remove, clear]);

  return (
    <CartActionsCtx.Provider value={actions}>
      <CartCtx.Provider value={value}>{children}</CartCtx.Provider>
    </CartActionsCtx.Provider>
  );
}

export const useCart = () => useContext(CartCtx);
// Só as ações: quem usa não re-renderiza quando a sacola muda.
export const useCartActions = () => useContext(CartActionsCtx);

// Como falar com a Bia: WhatsApp quando há número cadastrado; senão, o direct do Instagram.
export function useContact() {
  const { settings } = useCatalog();
  const number = String(settings.whatsapp || '').replace(/\D/g, '');
  const handle = instagramHandle(settings.instagram);
  const hasNumber = number.length >= 10;
  return {
    hasNumber,
    handle,
    instagram: settings.instagram,
    href: (message) => (hasNumber ? `https://wa.me/${number}${message ? `?text=${encodeURIComponent(message)}` : ''}` : `https://ig.me/m/${handle}`),
  };
}
