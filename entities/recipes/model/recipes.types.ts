import { Potion, Client, InstrumentKey, IngredientKey } from "@/entities"

export type Recipe = {
  id: string

  result: Potion

  // TODO: remete a key para no futuro usar um Object Literal e linkar
  instruments: InstrumentKey[]
  ingredients: IngredientKey[]

  description: string
  properties: string[]
  preparation: string

  references?: string[]
  clients?: Client[]
  scientificName?: string
}