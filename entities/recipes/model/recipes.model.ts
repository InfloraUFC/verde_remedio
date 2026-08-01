import { IngredientKey } from "@/entities/ingredient"
import { InstrumentKey } from "@/entities/instruments"
import { RECIPES } from "./recipes.constants"
import { Recipe } from "./recipes.types"

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
