-- Bia KIDSS: configurações da loja editáveis no /admin e departamentos livres (Meninas, Meninos, Bebês...).
-- Para quem já rodou o setup.sql antes. Pode rodar mais de uma vez sem problema.

alter table public.produtos drop constraint if exists produtos_genero_check;

create table if not exists public.configuracoes (
  id            int primary key default 1 check (id = 1),   -- uma linha só
  dados         jsonb not null default '{}'::jsonb,
  atualizado_em timestamptz not null default now()
);
alter table public.configuracoes enable row level security;

drop policy if exists "visitante le configuracoes" on public.configuracoes;
create policy "visitante le configuracoes" on public.configuracoes
  for select to anon, authenticated using (true);
drop policy if exists "dona cadastra configuracoes" on public.configuracoes;
create policy "dona cadastra configuracoes" on public.configuracoes
  for insert to authenticated with check (true);
drop policy if exists "dona altera configuracoes" on public.configuracoes;
create policy "dona altera configuracoes" on public.configuracoes
  for update to authenticated using (true) with check (true);

insert into public.configuracoes (id, dados) values (1, '{}'::jsonb) on conflict (id) do nothing;
