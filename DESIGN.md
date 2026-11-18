---
name: Bia KIDSS
description: Loja infantil escolhida pela Bia, onde a idade da criança é a régua que organiza a parede de peças.
colors:
  wall: "#fbf9ff"
  wall-light: "#efe9fb"
  lilac: "#b9a6db"
  violet: "#5b3fa8"
  violet-deep: "#3f2a80"
  graphite: "#2a2538"
  graphite-soft: "#4a4260"
  print: "#ffffff"
typography:
  display:
    fontFamily: "Bricolage Grotesque Variable, Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.6rem, 4.8vw, 4.7rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 88"
  headline:
    fontFamily: "Bricolage Grotesque Variable, Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "clamp(2.1rem, 4.4vw, 3.6rem)"
    fontWeight: 800
    lineHeight: 0.98
    letterSpacing: "-0.035em"
    fontVariation: "'wdth' 88"
  title:
    fontFamily: "Bricolage Grotesque Variable, Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.12rem"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  body:
    fontFamily: "Bricolage Grotesque Variable, Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "1.0625rem"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Bricolage Grotesque Variable, Bricolage Grotesque, system-ui, sans-serif"
    fontSize: "0.95rem"
    fontWeight: 700
    lineHeight: 1.2
  hand:
    fontFamily: "Kalam, Segoe Print, cursive"
    fontSize: "1.2rem"
    fontWeight: 700
    lineHeight: 1.2
rounded:
  sm: "4px"
  md: "8px"
  tag: "4px 14px 14px 4px"
  pill: "999px"
spacing:
  xs: "8px"
  sm: "12px"
  md: "24px"
  lg: "32px"
  xl: "56px"
  section: "104px"
components:
  button-solid:
    backgroundColor: "{colors.violet}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-solid-hover:
    backgroundColor: "{colors.violet-deep}"
  button-ghost:
    backgroundColor: "transparent"
    textColor: "{colors.graphite}"
    rounded: "{rounded.pill}"
    padding: "0 26px"
    height: "48px"
  button-tape:
    backgroundColor: "{colors.print}"
    textColor: "{colors.violet-deep}"
    rounded: "{rounded.pill}"
    height: "48px"
  chip-segment-active:
    backgroundColor: "{colors.violet}"
    textColor: "#ffffff"
    rounded: "{rounded.pill}"
    padding: "0 20px"
    height: "44px"
  piece-print:
    backgroundColor: "{colors.print}"
    padding: "8px"
  bag-tag:
    backgroundColor: "{colors.wall-light}"
    rounded: "{rounded.tag}"
    padding: "14px 14px 14px 30px"
  rail-tick-active:
    backgroundColor: "{colors.violet}"
    textColor: "#ffffff"
    height: "44px"
---

# Design System: Bia KIDSS

## Overview

**Creative North Star: "Régua de Crescimento"**

O batente de uma porta onde a família marca a altura das crianças. A página inteira é essa parede: uma régua de idades (1 a 16) fixa à esquerda organiza o catálogo, e as peças ficam coladas na parede como fotos reveladas, presas com fita lilás, levemente tortas, com anotações a mão da Bia. A idade é o primeiro filtro porque é a primeira pergunta de quem compra.

A paleta é contida e vem do logo: uma parede lavanda quase branca, violeta da marca para tudo que é ação, grafite arroxeado para texto. O lilás claro não é cor de superfície: aparece só como fita adesiva e como linhas finas da régua. A cor forte fica por conta das fotos das peças. A voz é pessoal (Kalam à mão, como bilhete da Bia), nunca corporativa.

Densidade média, ritmo editorial com seções largas (até 104px de respiro vertical), sem sombras decorativas além do peso de uma foto sobre a parede.

**Key Characteristics:**
- Régua de idades como navegação e filtro, vertical no desktop, faixa horizontal no celular.
- Fotos como impressões brancas coladas com fita e levemente rotacionadas.
- Violeta só em ação e estado ativo; lilás só em fita e linha.
- Dois vozes tipográficas: Bricolage firme para a loja, Kalam para o que a Bia "escreveu".
- Bordas grafite de 2px em contornos e divisores, pílulas em todos os botões.

## Colors

Lavanda quase branca de fundo, violeta de marca como única cor de ação, grafite arroxeado no texto, lilás apenas como fita e régua.

### Primary
- **Violeta da Marca** (#5b3fa8): fundo de botão sólido, filtro e régua ativos, botão da sacola, contorno de peça que combina com a idade.
- **Violeta Profundo** (#3f2a80): hover do botão sólido e fundo das faixas de fechamento (promoção da semana e rodapé).

### Secondary
- **Lilás de Fita** (#b9a6db): fita adesiva das fotos (a 85% de opacidade), linhas da régua, filete lateral do batente, seleção de texto. Nunca fundo de seção, texto ou botão.

### Neutral
- **Parede** (#fbf9ff): fundo da página.
- **Parede Clara** (#efe9fb): batente da régua, bloco "dúvida no tamanho", etiqueta de item da sacola, fundo de imagem em carregamento.
- **Impressão** (#ffffff): papel das fotos, números da régua, painel da sacola, texto sobre violeta profundo.
- **Grafite** (#2a2538): texto, bordas de 2px, divisores, foco.
- **Grafite Suave** (#4a4260): texto secundário, parágrafos de apoio, preços.

### Named Rules
**The Lilac-Is-Tape Rule.** O lilás #b9a6db só existe como fita e como linha fina. Se uma superfície, botão ou texto precisa de cor, é violeta ou grafite.

**The Violet-Means-Act Rule.** Violeta indica ação ou estado ativo (comprar, filtro ligado, idade escolhida). Não é decoração de título.

## Typography

**Display Font:** Bricolage Grotesque Variable (com Bricolage Grotesque, system-ui, sans-serif)
**Body Font:** a mesma Bricolage Grotesque (corpo e interface usam a família display)
**Hand Font:** Kalam 400/700 (com Segoe Print, cursive)

**Character:** Bricolage condensada (eixo wdth 88) e pesada nos títulos, tracking apertado, dá a firmeza de loja. Kalam entra como anotação a lápis da Bia: tamanhos, status, rótulos da régua, números dos passos.

### Hierarchy
- **Display** (800, clamp(2.6rem, 4.8vw, 4.7rem), 0.98): h1 do hero, tracking -0.035em, wdth 88, `text-wrap: balance`.
- **Headline** (800, clamp(2.1rem, 4.4vw, 3.6rem), 0.98): h2 das seções; variações menores para "tamanho" (até 3.2rem) e título da sacola (2.3rem).
- **Title** (700, 1.12rem, 1.2): nome da peça; 1.25rem nas perguntas do FAQ; 1.3rem no título de cada passo.
- **Body** (400, 1.0625rem, 1.55): texto corrido; leads em 1.15 a 1.3rem; limites de linha em 40 a 60ch.
- **Label** (700, 0.95 a 1rem): botões, filtros, preços (600/400, 0.95rem).
- **Hand** (Kalam 700, 1.05 a 1.3rem; 400 no status): tamanhos da peça ("Tam. 4, 6 e 10"), mensagem de status, anotações no hero, título "Idade", sinal de "+" do FAQ, numeração dos passos (2.3rem).

### Named Rules
**The Pencil-Note Rule.** Kalam é voz da Bia e informação de medida: tamanho, idade, status, anotação. Não vira título de seção nem texto corrido.

**The Tabular-Ruler Rule.** Números da régua usam 800 e `tabular-nums` para alinhar como graduação.

## Layout

Quadro em duas colunas: régua fixa de 136px (sticky, altura total) e a parede ao lado. Conteúdo centrado em até 1240px com 32px de margem lateral (18px no celular). Seções de fundo cheio (promoção, tamanho, rodapé) alinham o conteúdo a 1176px por `max(32px, ...)`.

Seções do hero e "como comprar" usam duas colunas assimétricas (1.3fr/0.7fr e 0.8fr/1.2fr) com gaps de 56 a 72px. Catálogo em `auto-fill, minmax(230px, 1fr)` com gaps 44px/28px. Respiro vertical de seção: 88 a 104px no desktop, 64 a 72px no celular.

Abaixo de 900px a régua vira faixa horizontal sticky no topo (itens de 48px, rolagem horizontal), o menu principal some, o catálogo passa a 2 colunas e todas as seções empilham. Um botão flutuante da sacola fica no canto inferior direito. Alvos de toque mínimos de 44px em tudo que clica.

## Elevation & Depth

Plano por padrão, com profundidade de papel: apenas fotos e a sacola projetam sombra, como impressão colada na parede. Fundos mudam por camadas tonais (Parede, Parede Clara, Violeta Profundo), não por sombra.

### Shadow Vocabulary
- **Impressão** (`0 12px 22px -12px rgba(42,37,56,0.5)`): foto do catálogo; variações `0 14px 28px -10px` no hero e `0 10px 18px -10px` na fileira do Instagram.
- **Fita** (`0 1px 2px rgba(0,0,0,.15)`): sob a fita lilás.
- **Gaveta da sacola** (`-20px 0 40px -20px rgba(0,0,0,.4)`) e botão flutuante (`0 12px 24px -8px rgba(42,37,56,0.55)`).

### Named Rules
**The Paper-Weight Rule.** Sombra é sempre difusa, deslocada para baixo e com spread negativo, como papel sobre parede. Sem sombra dura ou deslocada em bloco; botões e cartões de texto não têm sombra.

## Shapes

Duas famílias: pílulas (999px) para todo controle clicável e filtro; cantos retos para fotos (impressões brancas com moldura de 6 a 10px). Cantos de 4px e 8px em foco, campos e "pular para conteúdo". A etiqueta de item na sacola tem canto esquerdo de 4px e direito de 14px, com furo circular, como etiqueta de preço. Logo circular com borda branca de 3px. Fitas são retângulos translúcidos girados (de -12 a +9 graus); fotos giram entre -1.6 e +1.6 graus. Contornos e divisores usam 2px grafite; as linhas da régua, 1px lilás.

## Components

### Buttons
- **Shape:** pílula (999px), altura mínima 48px, borda 2px.
- **Solid:** fundo violeta, texto branco, padding 0 26px, peso 700. Hover vai para violeta profundo.
- **Ghost:** transparente com borda grafite; hover com véu grafite a 8%.
- **Line (no cartão da peça):** contorno grafite de largura total; hover e "Na sacola" preenchem de violeta.
- **Tape:** branco com texto violeta profundo, só sobre fundo violeta profundo.
- **Link:** texto sublinhado, 44px de altura (Limpar, Remover).
- **Active:** desce 1px e encolhe 1%. Foco: contorno grafite 3px com 3px de offset (branco sobre violeta profundo).

### Chips
Segmentos Meninas / Meninos / Bebês: pílula de 44px com borda grafite; selecionado preenche de violeta com texto branco (`aria-pressed`).

### Cards / Containers
- **Peça (impressão):** foto 20/21 em papel branco com 8px de moldura, fita pequena (48x16) no topo, rotação alternada em ciclo de 3. Hover: endireita e sobe 6px. Combina com a idade: contorno violeta 3px; não combina: 40% de opacidade e dessaturada, voltando ao hover.
- **Nome e tamanho:** nome em Bricolage 700, tamanhos em Kalam; preço em grafite suave só quando confirmado.
- **Etiqueta da sacola:** Parede Clara, canto assimétrico, furo à esquerda.

### Inputs / Fields
Seletor de tamanho: 44px, borda 2px grafite, canto 8px, fundo branco, texto 600. Foco global grafite 3px.

### Navigation
- **Régua de idades:** coluna de 1 a 16 de baixo para cima (como régua de altura). Cada marca é um bloco branco com número 800 e filete lilás; ativa vira violeta com texto branco, e a anotação em Kalam ("6 anos") ganha um traço que se risca. A cada três marcas, um tracinho de lápis. No celular, faixa horizontal com rolagem.
- **Topo:** logo circular + nome (800, wdth 90), links com sublinhado que cresce no hover, botão da sacola em violeta com contador branco.

### Fita adesiva (assinatura)
Retângulo lilás translúcido (92x30 em fotos grandes, 48x16 nas peças), girado, preso no topo da foto. Prende fotos grandes (hero, promoção) em dois pontos e fotos de catálogo em um.

### Selo (assinatura)
Círculo branco de 126px com texto violeta profundo em 800, girado 10 graus, sobre a foto da promoção.

## Do's and Don'ts

### Do:
- **Do** usar violeta (#5b3fa8) só para ação e estado ativo, e violeta profundo (#3f2a80) para hover e faixas de fechamento.
- **Do** mostrar fotos como impressões brancas (moldura 6 a 10px) com sombra difusa de spread negativo e rotação de no máximo ±1.6 graus.
- **Do** escrever tamanho, idade, status e anotações em Kalam; todo o resto em Bricolage 800/700/400.
- **Do** manter alvos de 44px, foco visível de 3px e `prefers-reduced-motion` desligando transições.
- **Do** usar bordas e divisores de 2px grafite; o lilás fica para linhas de régua de 1px.
- **Do** mover com a curva `cubic-bezier(0.22, 1, 0.36, 1)` em 0.2 a 0.4s.

### Don't:
- **Don't** usar lilás como fundo, texto ou botão; ele é fita e linha.
- **Don't** usar sombra dura ou deslocada em bloco, nem sombra em botões e cartões de texto.
- **Don't** usar Kalam em títulos de seção ou texto corrido.
- **Don't** colocar preço onde a loja não confirmou; o padrão é "valores pela Bia".
- **Don't** introduzir novas cores de acento além da paleta de oito valores acima.

## Não canonizado (dívidas da build)

- **Fita idêntica repetida:** a mesma fita (mesmo tamanho, cor e ângulo) cola todos os cards do catálogo; é repetição da build, não regra. Novas superfícies devem variar ou dispensar a fita.
- **Estrutura da seção "Como o pedido chega até você":** título e lista numerada seguem o molde de landing page (título + passos 1, 2, 3); item aberto da revisão, não padrão a reutilizar.
- **Valores soltos:** `#fff` literal usado fora do token `print` (texto sobre violeta, contador da sacola) e `rgba(42,37,56,…)` ad hoc; devem migrar para tokens.
