// Ferramentas do painel /admin.
import { getClient } from './supabase.js';

export const PUBLIC_MARK = '/storage/v1/object/public/fotos/';
export const pathOf = (url) => (url && url.includes(PUBLIC_MARK) ? decodeURIComponent(url.split(PUBLIC_MARK)[1]) : null);

export const AGES = Array.from({ length: 16 }, (_, i) => i + 1);
export const DEPT_SUGGESTIONS = ['Meninas', 'Meninos', 'Bebês', 'Unissex'];

// PADRÃO DAS FOTOS: toda foto nova sai igual, para a loja ficar uniforme.
// - formato 3:4 em pé; a foto inteira, sem cortar, centralizada em fundo branco;
// - foto cheia 1200 x 1600 e miniatura 480 x 640, JPEG de alta qualidade;
// - nunca é ampliada: foto menor gera um quadro 3:4 menor (mínimo de 600 px no lado menor).
export const PHOTO_SPEC = { ratio: 3 / 4, fullW: 1200, fullH: 1600, thumbW: 480, thumbH: 640, fullQ: 0.92, thumbQ: 0.88, minSide: 600 };

export async function prepare(file) {
  const bmp = await createImageBitmap(file, { imageOrientation: 'from-image' });
  const { ratio, fullW, thumbW, thumbH, fullQ, thumbQ, minSide } = PHOTO_SPEC;
  if (Math.min(bmp.width, bmp.height) < minSide) {
    const e = new Error('small');
    e.small = true;
    throw e;
  }
  // Menor quadro 3:4 que contém a foto na resolução original.
  const boxW = Math.max(bmp.width, bmp.height * ratio);
  const make = (outW, quality) => {
    const w = Math.round(Math.min(outW, boxW));
    const h = Math.round(w / ratio);
    const k = w / boxW;
    const dw = bmp.width * k;
    const dh = bmp.height * k;
    const c = document.createElement('canvas');
    c.width = w;
    c.height = h;
    const ctx = c.getContext('2d');
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, w, h);
    ctx.imageSmoothingQuality = 'high';
    ctx.drawImage(bmp, (w - dw) / 2, (h - dh) / 2, dw, dh);
    return new Promise((ok, fail) => c.toBlob((blob) => (blob ? ok({ blob, w, h }) : fail(new Error('foto'))), 'image/jpeg', quality));
  };
  const full = await make(fullW, fullQ);
  const thumb = await make(Math.min(thumbW, full.w), thumbQ);
  return { full, thumb, thumbH };
}

// "112,50" -> 112.5 ; vazio -> null ; texto inválido -> NaN
export const toPrice = (text) => {
  const t = String(text ?? '').replace(/[^\d,.-]/g, '').trim();
  if (!t) return null;
  const n = Number(t.includes(',') ? t.replace(/\./g, '').replace(',', '.') : t);
  return Number.isFinite(n) && n >= 0 ? Math.round(n * 100) / 100 : NaN;
};
export const fromPrice = (n) => (n == null ? '' : String(n).replace('.', ','));

export const errorText = (err) => (err && err.message && /row-level|jwt|permission|not authorized/i.test(err.message)
  ? 'Sua entrada expirou. Saia e entre de novo.'
  : 'Não consegui salvar. Verifique a internet e tente de novo.');

export async function updateMany(items) {
  // items: [{ id, set: {coluna: valor} }] — em grupos, para não sobrecarregar.
  const c = await getClient();
  for (let i = 0; i < items.length; i += 8) {
    const part = items.slice(i, i + 8);
    const res = await Promise.all(part.map((it) => c.from('produtos').update(it.set).eq('id', it.id)));
    const bad = res.find((r) => r.error);
    if (bad) throw bad.error;
  }
}
