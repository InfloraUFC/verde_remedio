# Imagens do jogo

**Nunca escreva `/images/...` direto no código.** Todos os caminhos ficam em
`shared/config/images.ts` (registro global). Para adicionar ou trocar uma arte:

1. Salve o arquivo na pasta do grupo, em **minúsculas, sem acento/espaço**
   (ex.: `casca-de-anta.webp`). Recomendado: WebP, até ~700px no maior lado.
2. Registre o caminho em `shared/config/images.ts`.
3. Rode `pnpm test:run` — o teste valida que tudo que está registrado existe e
   que nenhum arquivo ficou órfão.

| Pasta | Conteúdo |
|---|---|
| `plants/` | 15 plantas |
| `bases/` | óleo, álcool (**água pendente** → `water.webp`) |
| `utensils/` | chaleira, pilão, açúcar, garrafa, cataplasma |
| `characters/<nome>/` | sprites: `idle`, `talking-1`, `talking-2`, `angry` (+ `happy`) |
| `scenes/` | (**pendente**) `start-screen.webp` |
