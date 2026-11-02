import { IngredientKey } from "@/entities/ingredient"
import { InstrumentKey } from "@/entities/instruments"
import { RECIPES } from "./recipes.constants"
import { Recipe, TreatmentForType } from "./recipes.types"

function sameIngredientSet(a: IngredientKey[], b: IngredientKey[]): boolean {
  if (a.length !== b.length) return false

  const setA = new Set(a)
  const setB = new Set(b)

  if (setA.size !== setB.size) return false

  for (const key of setA) {
    if (!setB.has(key)) return false
  }

  return true
}

/**
 * Compara o conteúdo do caldeirão (ingredientes soltos + instrumento) com o
 * catálogo de receitas e retorna a receita correspondente, se existir.
 *
 * Regra atual (ver DEVELOPMENT_NOTES.md para discussão/alternativas):
 * - os ingredientes soltos precisam ser exatamente o mesmo CONJUNTO da
 *   receita (mesma quantidade, sem repetição, ordem não importa);
 * - o instrumento solto precisa ser o mesmo `recipe.type` da receita.
 */
export function findRecipeMatch(
  ingredientKeys: IngredientKey[],
  instrumentKey: InstrumentKey | null
): Recipe | null {
  if (!instrumentKey || ingredientKeys.length === 0) return null

  return (
    RECIPES.find(
      (recipe) =>
        recipe.type === instrumentKey &&
        sameIngredientSet(recipe.ingredients, ingredientKeys)
    ) ?? null
  )
}

/** Quantas vezes a mesma receita pode ser feita; a próxima é recusada. */
export const MAX_RECIPE_USES = 2

/**
 * A cliente "enjoa" da receita: na 3ª vez que o jogador tenta fazer a mesma
 * receita (por nível), ela recusa e o jogador precisa escolher outra.
 *
 * Trava de segurança contra softlock: só recusa se ainda existir OUTRA
 * receita liberada no nível que trate a mesma condição e ainda não tenha
 * estourado o limite. Sem alternativa, a receita continua valendo.
 */
export function isRecipeOverused(
  recipe: Recipe,
  uses: Record<string, number>,
  availableRecipes: Recipe[]
): boolean {
  if ((uses[recipe.id] ?? 0) < MAX_RECIPE_USES) return false

  return availableRecipes.some(
    (other) =>
      other.id !== recipe.id &&
      other.treatmentFor === recipe.treatmentFor &&
      (uses[other.id] ?? 0) < MAX_RECIPE_USES
  )
}

/**
 * Verifica se o instrumento solto é o mesmo usado por ALGUMA receita que
 * trata a condição informada — ou seja, "o modo de preparo tá certo pra
 * esse mal, mas os ingredientes não batem". Usado pra decidir acerto
 * parcial (ver `findRecipeMatch` para o acerto exato).
 */
export function treatsCondition(
  instrumentKey: InstrumentKey,
  treatmentFor: TreatmentForType
): boolean {
  return RECIPES.some(
    (recipe) => recipe.type === instrumentKey && recipe.treatmentFor === treatmentFor
  )
}
