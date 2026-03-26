import { Ingredient } from "@/entities"

export type CauldronState = {
  ingredients: Ingredient[]
  limit: number

  setLimit: (limit: number) => void
  addIngredient: (ingredient: Ingredient) => void
  removeIngredient: (id: string) => void
  clear: () => void
}