import { Ingredient, IngredientTypeEnum } from "./ingredient.types";

export const INGREDIENTS: Ingredient[] = [
  { id: "1", name: "Fogo", type: IngredientTypeEnum.FIRE },
  { id: "2", name: "Água", type: IngredientTypeEnum.WATER },
  { id: "3", name: "Terra", type: IngredientTypeEnum.EARTH },
]