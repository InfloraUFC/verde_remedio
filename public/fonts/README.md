# Fontes

- **Patrick Hand** (texto): carregada automaticamente pelo `next/font/google` em `app/layout.tsx`.
  (Substituiu a Gamja Flower, que desenha mal os acentos do português.)
- **Montaser Arabic** (títulos): não existe no `next/font/google`. Coloque o arquivo
  `montaser-arabic.woff2` nesta pasta e ele passa a ser usado (`@font-face` em
  `app/globals.css`). Sem o arquivo, os títulos usam a Patrick Hand como reserva.
