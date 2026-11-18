// Ícones simples (traço), herdam a cor do texto. Decorativos: ficam escondidos de leitores de tela.
const base = { width: 22, height: 22, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor', strokeWidth: 1.8, strokeLinecap: 'round', strokeLinejoin: 'round', 'aria-hidden': true, focusable: 'false', className: 'ico' };

export const IconWhatsApp = (p) => (
  <svg {...base} {...p}><path d="M3.5 20.5l1.3-4.6A8.5 8.5 0 1 1 8 19.3l-4.5 1.2z" /><path d="M9 8.5c.2 3 2.6 5.8 6 6.5l1.3-1.5-2-1-1 .6c-.9-.4-1.6-1.100-2-2l.6-1-1-2L9 8.500z" /></svg>
);
export const IconInstagram = (p) => (
  <svg {...base} {...p}><rect x="3.500" y="3.500" width="17" height="17" rx="5" /><circle cx="12" cy="12" r="4" /><circle cx="17.200" cy="6.800" r=".6" fill="currentColor" /></svg>
);
export const IconPin = (p) => (
  <svg {...base} {...p}><path d="M12 21s7-6 7-11.500A7 7 0 0 0 5 9.500C5 15 12 21 12 21z" /><circle cx="12" cy="9.500" r="2.500" /></svg>
);
export const IconBag = (p) => (
  <svg {...base} {...p}><path d="M5 8h14l-1 12H6L5 8z" /><path d="M9 8V6.500a3 3 0 0 1 6 0V8" /></svg>
);
export const IconHeart = ({ filled, ...p }) => (
  <svg {...base} {...p} fill={filled ? 'currentColor' : 'none'}><path d="M12 20.500s-7.500-4.600-7.500-10.200A4.300 4.300 0 0 1 12 7.800a4.300 4.300 0 0 1 7.500 2.500c0 5.600-7.500 10.200-7.500 10.200z" /></svg>
);
export const IconSearch = (p) => (
  <svg {...base} {...p}><circle cx="11" cy="11" r="6.500" /><path d="M16 16l4 4" /></svg>
);
export const IconChat = (p) => (
  <svg {...base} {...p}><path d="M4 5h16v11H9l-5 4V5z" /></svg>
);
export const IconTruck = (p) => (
  <svg {...base} {...p}><path d="M3 6h11v10H3zM14 9h4l3 3v4h-7z" /><circle cx="7.500" cy="17.500" r="1.800" /><circle cx="17" cy="17.500" r="1.800" /></svg>
);
export const IconTag = (p) => (
  <svg {...base} {...p}><path d="M3 12V4h8l10 10-8 8L3 12z" /><circle cx="7.500" cy="8.500" r="1.200" /></svg>
);
export const IconRuler = (p) => (
  <svg {...base} {...p}><path d="M3 16L16 3l5 5L8 21 3 16z" /><path d="M7 12l2 2M10 9l2 2M13 6l2 2" /></svg>
);
