# Roadmap — Bia KIDSS

Duas partes que não se misturam:
- **Loja** (`loja/`, o que o cliente vê). Hoje lê as 40 peças de `loja/src/data.js`.
- **Painel** (`loja/src/admin/`, rota `/admin`, só a Bia). Isolado: sem topo, rodapé nem sacola da loja, sem link no site, não indexado.

Origem: auditorias das skills responsive-design, image-optimization, react-vite-best-practices, web-accessibility e storefront-best-practices.

## Feito — loja
- [x] Fotos em resolução original, com o mesmo recorte sem texto (`public/img/p` cheia, `public/img/s` miniatura; medidas em `src/photoDims.js`); width/height reais.
- [x] Fallback de SPA (`public/_redirects`, `vercel.json`) e cabeçalhos de cache (`netlify.toml`).
- [x] Menu (Peças, Como comprar, Contato) visível no celular.
- [x] Pedido pelo WhatsApp com código da peça, total e pergunta de entrega/retirada; número cadastrado.
- [x] Peça com vários tamanhos: o card leva à página da peça ("Escolher tamanho").
- [x] Sacola validada, limite de 20 por peça, confirmação antes de esvaziar.
- [x] Acessibilidade (foco ao trocar de página, nomes nos botões, contagem da sacola).
- [x] Rotas sob demanda, tela de erro, contexto da sacola dividido, 100dvh no celular.
- [x] Grade das peças em um bloco só, fonte base em rem, "Ver mais" lembrado na URL, busca e ordem A–Z.
- [x] Texto de localização: Brasília, DF, e loja física em Mansidão, BA.

## Feito — painel (`/admin`)
- [x] Login da Bia (Supabase Auth; cadastro de novos usuários desligado).
- [x] **Peças:** cadastrar (botão grande "Cadastrar novo produto" e "Salvar e cadastrar outro"), editar, trocar foto (redimensiona no aparelho, sem cortar), esconder/mostrar, excluir com confirmação, "ir para o início", promoção da semana. Busca e filtros (escondidas, em promoção, sem preço).
- [x] **Campos:** nome, "para quem" livre (Meninas, Meninos, Bebês...), categoria livre, preço, preço de antes (desconto com %), tamanhos 1–16, observação de tamanho.
- [x] **Categorias:** renomear categorias e departamentos em todas as peças.
- [x] **Promoções:** aplicar X% em tudo, numa categoria ou num departamento; encerrar uma ou todas.
- [x] **Loja:** WhatsApp, Instagram, aviso no topo, título e texto da home, local, loja física, dúvidas frequentes.
- [x] Banco no Supabase: tabelas `produtos` e `configuracoes`, permissões (público só lê; só a Bia escreve), bucket `fotos`, 40 peças carregadas. SQL em `supabase/`.
- [x] Testado com dados simulados no desktop (1920) e no celular (390), sem erro e sem rolagem lateral.

## 1. Ligação da loja ao painel — feito, falta testar com o banco real
- [x] Loja lê as peças do banco (só as visíveis), com as 40 de `data.js` como reserva; lista guardada no aparelho (abre rápido e atualiza em seguida). Visual igual ao anterior.
- [x] Desconto: selo "-X%" e "de/por" nos cartões (só quando há desconto) e na página da peça; sem preço continua "valor pelo atendimento da Bia".
- [x] Categoria no filtro de Peças, botão "Só promoções" (aparece só se houver) e departamentos novos (Bebês...) nos filtros. Menu do topo não mudou.
- [x] Promoção da semana da home vem do banco (some se nenhuma peça estiver marcada).
- [x] Aba "Loja" do painel vale no site: WhatsApp, Instagram, aviso no topo, textos da home, local, dúvidas frequentes.
- [x] Sacola limpa sozinha peça que saiu da loja ou tamanho que deixou de existir.
- [x] **Padrão de fotos no painel:** toda foto nova sai em 3:4 em pé, inteira (sem cortar, fundo branco), 1200 x 1600 e miniatura 480 x 640, JPEG de alta qualidade, sem ampliar; recusa foto com lado menor abaixo de 600 px e mostra a prévia já no padrão.
- [ ] Conferir no navegador com o banco real depois que a Bia tiver login (testei com dados simulados).
- [ ] As 40 fotos antigas continuam nos formatos originais (não são 3:4); se quiser uniformizar tudo, reprocessar.

## 2. Fazer com você / a Bia
- [ ] Criar o usuário da Bia (Supabase > Authentication > Users) e testar o `/admin` de ponta a ponta: login, cadastrar peça com foto, editar, desconto, esconder, excluir.
- [ ] Decidir onde publicar (Netlify ou Vercel) e publicar `loja/dist` (passo a passo em `DEPLOY.md`).
- [ ] Com o endereço final: tags de compartilhamento (og:image, canonical), `robots.txt`, `sitemap.xml`; no Supabase, Site URL = endereço do site.
- [ ] Política de troca, pagamento, prazo e tabela de medidas (a Bia informa; depois entram nas dúvidas frequentes pelo painel).
- [ ] Peças 14 e 20: sem foto original em `fotos-loja` (ficaram em 511 px). Mandar as fotos originais.
- [ ] Remover a pasta `admin/` (sobrou só `node_modules`) e `_depois-do-painel-backup/` quando não precisar mais.

## 3. Navegação e vitrine (depois da ligação)
Ficou guardado em `_depois-do-painel-backup/` o código que eu havia feito; reaproveitar só o que você aprovar.
- [ ] Barra de categorias e busca no topo.
- [ ] "Compre por categoria" e "Peças em promoção" na home.
- [ ] Ordenar por menor/maior preço e maior desconto; filtro "só promoções".
- [ ] Departamentos novos (Bebês...) nos filtros.

## 4. Melhorias do painel
- [ ] Reordenar peças arrastando (hoje só "ir para o início").
- [ ] Várias fotos por peça.
- [ ] Controle de estoque simples ("esgotado" em vez de esconder).
- [ ] Recuperar senha pelo e-mail.
- [ ] Avisar antes de sair com formulário preenchido.

## 5. Baixo impacto
- [ ] Foto de recuperação se uma imagem quebrar (onError).
- [ ] srcset/WebP, container queries.
- [ ] Atualizar `DESIGN.md` (ainda descreve a régua de idades e a paleta antiga).
