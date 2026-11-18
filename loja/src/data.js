import { PHOTO_DIMS } from './photoDims.js';
// Número do WhatsApp da Bia, só dígitos com DDI e DDD. Ex.: '5561999999999'.
// Enquanto estiver vazio, o pedido é copiado e o direct do Instagram é aberto.
export const WHATSAPP_NUMBER = '5561996475818';
export const INSTAGRAM_URL = 'https://www.instagram.com/bia_kidss26';
export const DIRECT_URL = 'https://ig.me/m/bia_kidss26';


// sizes: idades (anos) confirmadas na legenda da foto. null = tamanho ainda não informado.
// price: só onde a loja confirmou. Demais: valor pelo WhatsApp.
const RAW = [
  { id: 33, g: 'Meninas', name: 'Vestido moranguinho com bolsa', sizes: [1, 2, 3, 4], sizeNote: '1 a 4', price: 'R$ 112,00', week: true },
  { id: 43, g: 'Meninas', name: 'Vestido branco com babado', sizes: [4, 6, 8], price: 'R$ 139,00' },
  { id: 3, g: 'Meninas', name: 'Conjunto vermelho de blusa babada e short', sizes: [2, 4, 8] },
  { id: 4, g: 'Meninas', name: 'Vestido branco de alças com babado', sizes: [4, 6, 10] },
  { id: 6, g: 'Meninas', name: 'Conjunto blusa de babados e short mostarda', sizes: [3, 6] },
  { id: 7, g: 'Meninos', name: 'Conjunto camiseta caramelo e bermuda', sizes: [8, 14] },
  { id: 12, g: 'Meninos', name: 'Conjunto camisa vermelha de botões e bermuda cinza', sizes: [6, 10] },
  { id: 9, g: 'Meninas', name: 'Conjunto blusa rosa e saia estampada', sizes: [12, 14, 16] },
  { id: 10, g: 'Meninas', name: 'Vestido de borboletas', sizes: [8, 12, 14] },
  { id: 11, g: 'Meninos', name: 'Conjunto camiseta vermelha e bermuda bege', sizes: [8, 12, 16] },
  { id: 13, g: 'Meninos', name: 'Conjunto camisa azul-marinho e bermuda azul', sizes: [8] },
  { id: 14, g: 'Meninos', name: 'Jardineira listrada com camiseta', sizes: [2], sizeNote: 'M e 2 anos' },
  { id: 15, g: 'Meninos', name: 'Polos lisas brancas e vermelhas', sizes: AGES_RANGE(1, 16), sizeNote: '1 a 16' },
  { id: 20, g: 'Meninas', name: 'Conjunto colete e short em tons de rosa e marrom', sizes: [8, 12, 14, 16] },
  { id: 25, g: 'Meninas', name: 'Vestido amarelo com alças de babado', sizes: null },
  { id: 24, g: 'Meninas', name: 'Vestido jeans com laços', sizes: null },
  { id: 35, g: 'Meninas', name: 'Vestido estampado com bolsa de peixinho', sizes: null },
  { id: 18, g: 'Meninas', name: 'Conjunto de short rosa', sizes: null },
  { id: 30, g: 'Meninas', name: 'Conjunto camiseta Sweet Bear e shorts', sizes: null },
  { id: 19, g: 'Meninos', name: 'Camiseta tartaruga e bermuda', sizes: null },
  { id: 2, g: 'Meninos', name: 'Camiseta Venice Beach e bermuda bege', sizes: null },
  { id: 21, g: 'Meninos', name: 'Camiseta azul-marinho e bermuda listrada', sizes: null },
  { id: 22, g: 'Meninos', name: 'Camiseta off-white e bermuda listrada verde', sizes: null },
  { id: 27, g: 'Meninos', name: 'Camiseta de pegadas e bermuda terracota', sizes: null },
  { id: 28, g: 'Meninos', name: 'Camiseta de dinossauros e bermuda bege', sizes: null },
  { id: 31, g: 'Meninos', name: 'Camisa marrom e bermuda bege', sizes: null },
  { id: 32, g: 'Meninos', name: 'Camiseta off-white e bermuda marrom', sizes: null },
  { id: 5, g: 'Meninas', name: 'Vestido vinho com laços', sizes: null },
  { id: 23, g: 'Meninas', name: 'Vestido vinho com laço e blusa', sizes: null },
  { id: 16, g: 'Meninas', name: 'Vestido vermelho de babado', sizes: null },
  { id: 17, g: 'Meninas', name: 'Conjunto xadrez azul com renda', sizes: null },
  { id: 26, g: 'Meninas', name: 'Conjunto branco de babados', sizes: null },
  { id: 34, g: 'Meninas', name: 'Vestido pink com laço', sizes: null },
  { id: 36, g: 'Meninas', name: 'Vestido dálmata e gatinhos', sizes: null },
  { id: 38, g: 'Meninas', name: 'Jardineira rosa com blusa de poá', sizes: null },
  { id: 39, g: 'Meninas', name: 'Vestido verde-oliva de babados', sizes: null },
  { id: 40, g: 'Meninas', name: 'Vestido bege com renda', sizes: null },
  { id: 41, g: 'Meninas', name: 'Vestido rosa com laços no ombro', sizes: null },
  { id: 42, g: 'Meninas', name: 'Conjunto rosa de colete e saia', sizes: null },
  { id: 44, g: 'Meninas', name: 'Conjunto listrado marinho', sizes: null },
];

function AGES_RANGE(a, b) { return Array.from({ length: b - a + 1 }, (_, i) => a + i); }

export const FAQ = [
  { q: 'Como faço meu pedido?', a: 'Escolha as peças, coloque na sacola e envie para a Bia. Ela confirma tamanho e estoque com você antes de fechar.' },
  { q: 'Quais tamanhos vocês têm?', a: 'A loja atende de 1 a 16 anos, meninas e meninos. Cada peça mostra os tamanhos disponíveis; quando não aparecem, a Bia confirma pelo WhatsApp.' },
  { q: 'Qual o valor das peças?', a: 'Quando a peça mostra o valor, é esse. Nas demais, a Bia passa o valor no atendimento.' },
  { q: 'Como funciona a entrega?', a: 'A Bia combina com você, direto na conversa. Ela está em Brasília, DF, e tem loja física em Mansidão, BA.' },
];

const pad = (id) => String(id).padStart(2, '0');
// Foto cheia (destaque e página da peça) e miniatura (listas), com as medidas reais.
const dims = (id, kind) => PHOTO_DIMS[Number(id)]?.[kind] || [];
// Categoria sugerida pelo nome (só para as peças deste arquivo; no banco a Bia escolhe).
const guessCat = (name) => {
  const n = name.toLowerCase();
  if (n.startsWith('vestido')) return 'Vestidos';
  if (n.startsWith('jardineira')) return 'Jardineiras';
  if (n.startsWith('polo')) return 'Camisetas e polos';
  return 'Conjuntos';
};
const num = (s) => (s ? Number(String(s).replace(/[^\d,]/g, '').replace(',', '.')) : null);

export const PRODUCTS = RAW.map((p) => ({
  ...p,
  cat: guessCat(p.name),
  priceNum: num(p.price),
  oldNum: null,
  discount: 0,
  photo: `/img/p/${pad(p.id)}.jpg`,
  thumb: `/img/s/${pad(p.id)}.jpg`,
  photoW: dims(p.id, 'p')[0],
  photoH: dims(p.id, 'p')[1],
  thumbW: dims(p.id, 's')[0],
  thumbH: dims(p.id, 's')[1],
}));

// Atributos width/height da foto (kind 'p' = cheia, 's' = miniatura).
export const photoProps = (p, kind = 'p') => {
  const w = kind === 's' ? p.thumbW : p.photoW;
  const h = kind === 's' ? p.thumbH : p.photoH;
  return w && h ? { width: w, height: h } : {};
};

const range = (a) => a.length > 2 && a.every((n, i) => i === 0 || n === a[i - 1] + 1) ? `${a[0]} a ${a[a.length - 1]}` : a.join(', ');
export const sizeLabel = (p) => (!p.sizes ? 'Tamanho com a Bia' : p.sizeNote ? `Tam. ${p.sizeNote}` : `Tam. ${range(p.sizes)}`);

// Fotos fixas das páginas (destaque da home e faixa do Instagram): existem mesmo sem peça cadastrada.
export const fixedPhoto = (id) => ({
  photo: `/img/p/${pad(id)}.jpg`,
  thumb: `/img/s/${pad(id)}.jpg`,
  photoW: dims(id, 'p')[0],
  photoH: dims(id, 'p')[1],
  thumbW: dims(id, 's')[0],
  thumbH: dims(id, 's')[1],
});

// Texto de preço de uma peça: valor atual, valor de antes e % de desconto (quando em promoção).
export const priceBits = (p) => ({ price: p.price || '', old: p.discount > 0 ? p.oldPrice : '', off: p.discount > 0 ? p.discount : 0 });
export const slug = (t) => t.normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

// Ajudas usadas pelas páginas.
const pad2 = (id) => String(id).padStart(2, '0');
export const byId = (id) => PRODUCTS.find((p) => p.id === Number(id));
export const img = (id) => `/img/p/${pad2(id)}.jpg`;
export const thumb = (id) => `/img/s/${pad2(id)}.jpg`;
// Largura e altura reais da foto (kind 's' = miniatura, senão a cheia).
export const photoSize = (id, kind = 'p') => {
  const d = PHOTO_DIMS[Number(id)]?.[kind === 's' ? 's' : 'p'];
  return d ? { width: d[0], height: d[1] } : {};
};

// Textos de partida da loja. O que a Bia salvar na aba "Loja" do painel vale por cima destes.
export const DEFAULT_SETTINGS = {
  whatsapp: WHATSAPP_NUMBER,
  instagram: INSTAGRAM_URL,
  aviso: '',
  aviso_link: '',
  hero_titulo: 'Peças para crescer, escolhidas pela Bia.',
  hero_texto: 'Meninas e meninos de 1 a 16 anos. Monte a sacola e feche o pedido direto com a Bia.',
  local_atende: 'Brasília, DF',
  local_loja: 'Mansidão, BA',
  endereco_loja: 'R. João Batista Lima, 57 - Centro, Mansidão - BA, 47160-280',
  faq: FAQ,
};
export const instagramHandle = (url) => {
  const m = String(url || '').match(/instagram\.com\/([^/?#]+)/i);
  return m ? m[1] : String(url || '').replace(/^@/, '');
};
