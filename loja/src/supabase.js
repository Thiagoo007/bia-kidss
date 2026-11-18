// Conexão com o Supabase (onde a Bia cadastra produtos e fotos).
// Sem as chaves em .env, o site usa só o catálogo de src/data.js. A Bia cadastra tudo pelo painel (pasta admin).
export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const isLive = Boolean(SUPABASE_URL && SUPABASE_KEY);

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const brl = (v) => money.format(Number(v)).replace(/\u00a0/g, ' ');

// Linha da tabela "produtos" -> peça no formato que o site usa.
export function fromRow(r) {
  return {
    id: r.id,
    g: r.genero,
    name: r.nome,
    sizes: Array.isArray(r.tamanhos) && r.tamanhos.length ? r.tamanhos : null,
    sizeNote: r.tamanho_nota || undefined,
    price: r.preco != null ? brl(r.preco) : undefined,
    priceNum: r.preco != null ? Number(r.preco) : null,
    oldPrice: r.preco_antigo != null ? brl(r.preco_antigo) : undefined,
    oldNum: r.preco_antigo != null ? Number(r.preco_antigo) : null,
    discount: r.preco != null && r.preco_antigo != null && Number(r.preco_antigo) > Number(r.preco)
      ? Math.round((1 - Number(r.preco) / Number(r.preco_antigo)) * 100) : 0,
    cat: (r.categoria || '').trim() || 'Outras peças',
    week: Boolean(r.destaque),
    photo: r.foto,
    thumb: r.miniatura || r.foto,
    photoW: r.foto_w || undefined,
    photoH: r.foto_h || undefined,
    thumbW: r.mini_w || undefined,
    thumbH: r.mini_h || undefined,
  };
}

// Leitura pública (só peças disponíveis). Usa fetch simples para não pesar no site.
export async function fetchCatalog(signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/produtos?select=*&ativo=eq.true&order=ordem.asc,id.desc`, {
    // Chave "publishable" (sb_publishable_...) vai só no apikey; a chave antiga (JWT) também vai como Bearer.
    headers: SUPABASE_KEY.startsWith('eyJ') ? { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } : { apikey: SUPABASE_KEY },
    signal,
  });
  if (!res.ok) throw new Error(`catalogo ${res.status}`);
  return (await res.json()).map(fromRow);
}

// Configurações da loja (uma linha só, id = 1).
export async function fetchSettings(signal) {
  const res = await fetch(`${SUPABASE_URL}/rest/v1/configuracoes?select=dados&id=eq.1`, {
    headers: SUPABASE_KEY.startsWith('eyJ') ? { apikey: SUPABASE_KEY, Authorization: `Bearer ${SUPABASE_KEY}` } : { apikey: SUPABASE_KEY },
    signal,
  });
  if (!res.ok) throw new Error(`config ${res.status}`);
  const rows = await res.json();
  return (rows[0] && rows[0].dados) || {};
}
