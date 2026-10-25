# Fontes

- **Gamja Flower** (texto): carregada automaticamente pelo `next/font/google` em `app/layout.tsx`.
- **Montaser Arabic** (títulos): não existe no `next/font/google`. Colocar o arquivo
  `montaser-arabic.woff2` nesta pasta e ele passa a ser usado (`@font-face` em
  `app/globals.css`). Sem o arquivo, os títulos usam a fonte de reserva.
