-- Bia KIDSS: acrescenta categorias e descontos às peças.
-- Para quem já rodou o setup.sql antes. Pode rodar mais de uma vez sem problema.

alter table public.produtos add column if not exists preco_antigo numeric(10, 2);
alter table public.produtos add column if not exists categoria text;

-- Categorias das peças que já estão no banco (a Bia pode mudar depois, no /admin).
update public.produtos set categoria = case
  when lower(nome) like 'vestido%'    then 'Vestidos'
  when lower(nome) like 'jardineira%' then 'Jardineiras'
  when lower(nome) like 'polo%'       then 'Camisetas e polos'
  else 'Conjuntos'
end
where categoria is null;
