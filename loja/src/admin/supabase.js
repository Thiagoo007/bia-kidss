// Conexão do painel com o Supabase (login, banco e fotos).
import { createClient } from '@supabase/supabase-js';

export const SUPABASE_URL = (import.meta.env.VITE_SUPABASE_URL || '').replace(/\/$/, '');
export const SUPABASE_KEY = import.meta.env.VITE_SUPABASE_ANON_KEY || '';
export const isLive = Boolean(SUPABASE_URL && SUPABASE_KEY);

const money = new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' });
export const brl = (v) => money.format(Number(v)).replace(/\u00a0/g, ' ');

let client;
export async function getClient() {
  if (!client) client = createClient(SUPABASE_URL, SUPABASE_KEY);
  return client;
}
