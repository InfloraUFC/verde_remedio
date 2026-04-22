import { Ingredient } from "@/entities"

export type CauldronState = {
  ingredients: Ingredient[]
  limit: number

  isCauldronFull: () => boolean
  setLimit: (limit: number) => void
  addIngredient: (ingredient: Ingredient) => void
  removeIngredient: (id: string) => void
  clearIngredients: () => void
}