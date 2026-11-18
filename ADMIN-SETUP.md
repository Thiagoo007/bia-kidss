# Painel da Bia (rota /admin)

O painel fica na rota `/admin` (`seusite.com.br/admin`), isolado da loja: código em `loja/src/admin/`, sem topo, rodapé nem sacola da loja e sem nenhum link a partir do site. A loja lê o que a Bia grava no painel (peças, preços, descontos, categorias e configurações); se o banco falhar, usa as 40 peças de `loja/src/data.js`. A Bia cadastra, edita, esconde e exclui peças, preços e fotos por ele, direto do celular.
Os dados ficam num projeto gratuito do **Supabase**. Sem essa configuração o site funciona normalmente com as 40 peças de `loja/src/data.js`, e o painel só avisa que não está conectado.

## 1. Criar o projeto (uma vez, por quem monta o site)
1. Entre em https://supabase.com, crie a conta e um projeto novo (região **South America (São Paulo)**). Guarde a senha do banco.
2. No projeto, abra **SQL Editor** > **New query**, cole o conteúdo de `supabase/setup.sql` e clique **Run**.
3. Abra uma nova query, cole `supabase/seed.sql` e clique **Run**. Isso leva para o banco as 40 peças que já estão no site.

## 2. Criar o login da Bia
1. **Authentication** > **Users** > **Add user** > **Create new user**. Use o e-mail da Bia, uma senha forte e marque **Auto Confirm User**.
2. **Authentication** > **Sign In / Providers** (ou **Settings**): desligue **Allow new users to sign up**. Assim ninguém além da Bia consegue criar login. **Esse passo é importante**: qualquer pessoa com login consegue alterar as peças.

## 3. Ligar o site ao projeto
1. **Project Settings** > **API**: copie a **Project URL** e a chave **anon public**. (Nunca use a chave `service_role`.)
2. Na pasta `loja`, copie `.env.example` para `.env` e cole os dois valores.
3. Rode `npm run build` e publique a pasta `loja/dist` (as variáveis entram no momento do build).

## 4. Usar
- Teste local: dentro de `loja/`, `npm run dev` e abra http://127.0.0.1:5174/admin (usa o `loja/.env`). Entre com o e-mail e a senha criados no passo 2.
- **Nova peça**: foto, nome, para quem, preço (opcional), tamanhos e se aparece no site.
- **Promoção da semana**: marque em uma peça; ela aparece em destaque na página inicial (só uma por vez).
- **Escondida do site**: desmarque "Aparece no site" quando acabar o estoque. Dá para mostrar de novo depois.
- As fotos são reduzidas no próprio celular antes de enviar (cheia até 1600 px e miniatura de 640 px), sem cortar.

## Observações
- Mudanças aparecem no site para novos visitantes na hora. Quem já tinha aberto o site vê a versão anterior por instantes até a página atualizar.
- O plano gratuito do Supabase pausa o projeto depois de 7 dias sem nenhum acesso. Como o site consulta o banco a cada visita, isso só acontece se ninguém abrir o site por uma semana. Se pausar, basta reativar no painel.
- Se a Bia esquecer a senha: **Authentication** > **Users** > menu do usuário > **Send password recovery**, ou defina uma nova senha pelo painel.

## O que a Bia controla pelo painel

- **Peças**: foto, nome, "para quem" (Meninas, Meninos, Bebês... ela pode criar outros), categoria (nova categoria = só escrever o nome), preço, preço de antes (vira desconto com selo -X%), tamanhos, esconder/mostrar, promoção da semana, trazer para o início.
- **Categorias**: renomear categorias e departamentos em todas as peças de uma vez. O menu do site se monta sozinho.
- **Promoções**: aplicar X% em tudo, numa categoria ou num departamento; encerrar promoções.
- **Loja**: WhatsApp, Instagram, faixa de aviso no topo, título e texto da página inicial, onde atende, loja física e as dúvidas frequentes.

Se o banco foi criado antes: rodar `supabase/migracao-categorias-descontos.sql` e depois `supabase/migracao-2-configuracoes.sql` (os dois já foram rodados no projeto atual).
