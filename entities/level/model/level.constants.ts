import { LevelConfig } from "./level.types"

/**
 * Níveis baseados na seção "1. SOBRE O JOGO / Requisitos" do documento de
 * design (JOGO (1).pdf). `starsRequired` e `lives` vêm exatamente do
 * documento. `clientIds` segue a ordem de desbloqueio descrita lá
 * (Luciana → +Amanda → +Luiz).
 *
 * `recipeIds` foi reconciliado à mão contra as 10 receitas reais que temos
 * (o documento fala em 11 receitas no nível 7 e lista combinações de
 * plantas por nível que não batem 100% com os ingredientes das receitas
 * cadastradas — ver DEVELOPMENT_NOTES.md pra detalhes). As plantas e
 * instrumentos liberados NÃO são uma lista separada: são derivados destas
 * receitas em `level.model.ts`, pra nunca ficar inconsistente.
 */
export const LEVELS: LevelConfig[] = [
  {
    id: 1,
    starsRequired: 100,
    lives: 5,
    clientIds: ["1"], // Luciana
    recipeIds: ["2", "3"], // Chá de Guiné, Chá de Jurubeba
  },
  {
    id: 2,
    starsRequired: 150,
    lives: 5,
    clientIds: ["1"],
    recipeIds: ["2", "3", "9"], // + Cataplasma de açafrão-da-terra
  },
  {
    id: 3,
    starsRequired: 250,
    lives: 5,
    clientIds: ["1", "3"], // + Amanda
    recipeIds: ["2", "3", "4", "8", "9"], // + Chá de jatobá, Chá de casca d'anta
  },
  {
    id: 4,
    starsRequired: 300,
    lives: 4,
    clientIds: ["1", "3"],
    recipeIds: ["2", "3", "4", "8", "9", "10"], // + Pó de quina-do-cerrado
  },
  {
    id: 5,
    starsRequired: 350,
    lives: 4,
    clientIds: ["1", "3"],
    recipeIds: ["2", "3", "4", "7", "8", "9", "10"], // + Garrafada (sem cliente fixo)
  },
  {
    id: 6,
    starsRequired: 450,
    lives: 3,
    clientIds: ["1", "3", "2"], // + Luiz
    recipeIds: ["1", "2", "3", "4", "5", "7", "8", "9", "10"], // + Lambedores de Luiz
  },
  {
    id: 7,
    starsRequired: 550,
    lives: 3,
    clientIds: ["1", "3", "2"],
    recipeIds: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"], // todas as 10
  },
]
