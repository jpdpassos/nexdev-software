# NexDev Software: landing page institucional

Site estático (HTML, CSS e JavaScript puros), sem dependências nem etapa de build.

## Como visualizar

Opção 1: abra o `index.html` direto no navegador.

Opção 2: servidor local (recomendado):

```bash
python3 -m http.server 8000
```

Acesse http://localhost:8000.

## Configurar o WhatsApp

Em `script.js`, altere a constante marcada:

```js
const WHATSAPP_NUMBER = "5500000000000"; // código do país + DDD + número
```

Ela alimenta o botão "Chamar no WhatsApp" e o envio do formulário (que abre o WhatsApp com a mensagem preenchida). Não há backend: nada é armazenado.

## Estrutura

```
index.html   página
styles.css   estilos
script.js    menu, ano do rodapé, formulário e WhatsApp
assets/      logo, background e storyboards (preservados)
docs/        estrutura e conteúdo (docs/estrutura-conteudo.md)
scripts/, tools/, prompts/, build/, dist/   materiais do reel, não usados pelo site
```

## Publicação

O site é publicado automaticamente no GitHub Pages a cada atualização na branch `main`.

## Antes de publicar

- Trocar o número do WhatsApp.
- Adicionar URL canônica e `og:url` quando o domínio existir.
- Substituir os cards de "Exemplo de solução" por cases reais, se desejar.
- Opcional: gerar versões otimizadas (WebP) das imagens em `assets/`.
