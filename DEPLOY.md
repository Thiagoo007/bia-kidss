# Publicar o site

O site é estático: a pasta `loja/dist` é tudo o que vai para a internet. Nada foi publicado ainda.

## Opção mais simples: Netlify, arrastando a pasta
1. Para a Bia usar o painel em `/admin`, faça antes o `ADMIN-SETUP.md` (precisa do arquivo `loja/.env`).
2. Na pasta `loja`: `npm install` (só na primeira vez) e `npm run build`.
3. Entre em https://app.netlify.com (crie a conta, é grátis), vá em **Add new site** > **Deploy manually** e arraste a pasta **`loja/dist`**.
4. O Netlify devolve um endereço do tipo `nome.netlify.app`. Em **Domain management** dá para trocar o nome ou ligar um domínio próprio.
5. Para atualizar o site depois, rode `npm run build` e arraste a `dist` de novo (em **Deploys**).

Os redirecionamentos (para `/sacola`, `/produto/33` e `/admin` funcionarem ao recarregar) já vão dentro da `dist`.

## Vercel
Mesmo caminho: `npm run build` e importar a pasta `loja` em https://vercel.com (o `vercel.json` já tem o redirecionamento).

## Depois de publicar
- Teste no celular: abrir a home, uma peça, colocar na sacola, "Enviar pedido pelo WhatsApp".
- Recarregue `/sacola` e `/produto/33` para ter certeza de que não dá 404.
- Com o endereço final em mãos, peça para completar as tags de compartilhamento (foto e título no link do WhatsApp/Instagram), o `robots.txt` e o `sitemap.xml`.
- Ponha o endereço no Instagram da Bia (@bia_kidss26).

