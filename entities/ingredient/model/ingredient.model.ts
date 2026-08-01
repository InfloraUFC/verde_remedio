import { INGREDIENTS } from "./ingredient.constants"
import { IngredientKey } from "./ingredient.types"

export const getIngredientByKey = (key: IngredientKey) => {
  return INGREDIENTS.find((ingredient) => ingredient.key === key)
}
