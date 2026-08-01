import { Ingredient, Instrument } from "@/entities"

export type CauldronState = {
  ingredients: Ingredient[]
  limit: number

  instrument: Instrument | null

  isCauldronFull: () => boolean
  setLimit: (limit: number) => void
  addIngredient: (ingredient: Ingredient) => void
  removeIngredient: (id: string) => void
  clearIngredients: () => void

  setInstrument: (instrument: Instrument) => void
  removeInstrument: () => void

  reset: () => void
}
