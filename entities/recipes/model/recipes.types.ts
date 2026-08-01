import { Potion, Client, InstrumentKey, IngredientKey } from "@/entities"

export const TREATMENT_CONSTANT = {
  EXPECTORANT: "EXPECTORANT",
  BRONCHITIS: "BRONCHITIS",
  HEALING: "HEALING",
  ARTHRITIS: "ARTHRITIS",
  GASTRITIS: "GASTRITIS"
}

export type TreatmentForType =
  (typeof TREATMENT_CONSTANT)[keyof typeof TREATMENT_CONSTANT]

export const TREATMENT_LABELS: Record<TreatmentForType, string> = {
  EXPECTORANT: "Expectorante",
  BRONCHITIS: "Bronquite",
  HEALING: "Cicatrização",
  ARTHRITIS: "Artrite",
  GASTRITIS: "Gastrite",
}

export type Recipe = {
  id: string

  name: string

  result: Potion
  properties: string[]
  type: InstrumentKey
  treatmentFor: TreatmentForType

  // TODO: remete a key para no futuro usar um Object Literal e linkar
  instruments: InstrumentKey[]
  ingredients: IngredientKey[]

  description: string
  preparation: string

  references?: string[]
  clients?: Client[]
  scientificName?: string
}