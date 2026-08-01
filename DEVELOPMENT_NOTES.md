# Notas de desenvolvimento — rodada atual

Este arquivo documenta o que foi implementado nesta rodada, as decisões
tomadas e o que ainda falta para o jogo ficar completo. A ideia é manter
esse histórico atualizado a cada entrega, pra não depender só do chat.

## O que foi pedido nesta rodada

1. Livro de receitas: mostrar **2 itens por página** (antes era 1 por página,
   2 por abertura/spread).
2. Liberdade para adicionar o que eu julgasse necessário, desde que documentado.

## O que foi feito

### 1. `FlipBook` com N itens por página

`features/book-dialog/ui/flip-book.tsx` foi generalizado: antes cada página
(metade do livro) mostrava exatamente 1 item; agora aceita um prop
`itemsPerPage` (default `2`). Uma "abertura" do livro (spread) continua
sendo 2 páginas lado a lado, então hoje aparecem até **4 itens por vez**
(2 na página esquerda + 2 na direita).

Os itens dentro de cada página são separados por uma linha divisória sutil
(`divide-y`) e cada um usa a mesma função `renderItem` de antes — nenhuma
mudança foi necessária em `book-dialog.tsx` além de deixar o default cuidar
disso.

Se em algum momento quiser 1, 3 ou qualquer outro número por página, é só
passar `itemsPerPage={N}` no `<FlipBook />`.

### 2. Lógica de "preparar poção" (match receita × caldeirão)

Essa era a peça que faltava desde a primeira análise do projeto: o caldeirão
já aceitava ingredientes e instrumento, mas nada comparava o conteúdo dele
com o catálogo de receitas. Adicionei:

- **`entities/recipes/model/recipes.model.ts`** — `findRecipeMatch(ingredientKeys, instrumentKey)`,
  função pura que percorre `RECIPES` e retorna a receita cujo `type`
  (instrumento) bate com o instrumento solto E cujo conjunto de ingredientes
  é **exatamente igual** (mesma quantidade, sem repetição, ordem não importa)
  ao que está no caldeirão. Testada em `recipes.model.test.ts` (6 casos).

- **`features/brew-potion`** (nova feature):
  - `model/brew-potion.store.ts` — store Zustand com o resultado da última
    tentativa (`idle | success | failure`).
  - `ui/brew-button.tsx` — botão "Preparar poção" (desabilitado se não
    houver pelo menos 1 ingrediente + 1 instrumento no caldeirão). Ao clicar,
    roda `findRecipeMatch` e limpa o caldeirão (`useCauldronStore.reset()`).
  - `ui/brew-result.tsx` — painel de feedback: verde com o nome da
    poção + tratamento se bateu, vermelho com mensagem genérica se não bateu.

  Ambos plugados no `PotionLab`, logo abaixo da barra de itens do caldeirão.

### Regra de match escolhida (e alternativas)

Optei pela regra mais simples possível — **conjunto exato de ingredientes +
instrumento correto** — porque é a que os dados atuais suportam sem
ambiguidade. Alternativas que ficaram de fora por ora, mas são fáceis de
trocar dentro de `findRecipeMatch` quando o design decidir:

- **Superconjunto**: aceitar receitas cujos ingredientes estejam *contidos*
  no que foi solto (ignorando excedentes). Fica estranho sem uma penalidade
  por desperdício.
- **Match parcial com pontuação**: retornar o quão perto a combinação chegou
  de alguma receita, pra alimentar a mecânica de "25 estrelas parcial /
  50 estrelas completo" que está no documento de design (`JOGO (1).pdf`,
  seção "Recompensa") e que ainda não foi implementada.

## O que falta (pendências conhecidas)

Organizei por área, sem prioridade implícita — é pra você decidir a ordem.

**Mecânica de jogo**
- Sistema de cliente/diálogo (o documento de design descreve o Girassolino,
  tutorial, falas do cliente satisfeito/insatisfeito) — hoje existe só o
  placeholder "Cena do cliente (em breve)".
- Vidas, XP/nível, progressão de 7 níveis com liberação gradual de
  plantas/receitas/clientes — nada disso existe ainda.
- Pontuação parcial (25/50/10 estrelas bônus) descrita no PDF.
- Cataplasma tem uma etapa a mais no papel (amassar/misturar antes de
  aplicar) que hoje é só "solta e clica em preparar" — se quiser manter mais
  fiel ao preparo real, dá pra pensar numa etapa intermediária.

**UI/UX**
- Responsividade: o layout atual assume tela larga (grid de 3 colunas com
  larguras fixas). Não testei em mobile — o próprio design de referência
  que você mandou tinha uma versão mobile diferente (personagens embaixo,
  etc.), que não foi replicada.
- Acessibilidade do drag-and-drop: hoje só funciona com mouse/touch
  (`@dnd-kit/core` sem sensores de teclado configurados). Quem não consegue
  arrastar não tem alternativa pra jogar.
- Assets de imagem: `entities/ingredient` e `entities/instruments` já têm os
  campos `image`/`img` apontando pros caminhos certos em `/public/images/...`
  (ver `public/images/README.md`), mas nenhum PNG foi adicionado — tudo usa
  os ícones de fallback (lucide-react).

**Qualidade**
- Só a lógica nova (`findRecipeMatch`) ganhou testes automatizados. Os
  componentes de UI novos (`Cauldron`, `BrewButton`, `FlipBook`, shelves)
  não têm testes nem stories no Storybook ainda.
- `RECIPES[7]` (garrafada) tem `clients: []` representando "qualquer
  cliente" — é uma convenção informal que só está documentada em comentário
  no código; se o sistema de cliente for implementado, vale formalizar isso
  (ex: um enum `ANY_CLIENT` em vez de array vazio).

## Validação feita nesta rodada

- `tsc --noEmit` — 0 erros
- `vitest run` — 28/28 testes passando (22 antigos + 6 novos de `findRecipeMatch`)
- `next build` — build de produção completo sem erros (fontes do Google
  temporariamente trocadas por fallback local só pra validar aqui no
  sandbox, que não tem acesso a `fonts.googleapis.com`; o `app/layout.tsx`
  foi restaurado ao original depois do teste — no seu ambiente com internet
  isso funciona normalmente)
