export const INGREDIENT_KEYS = {
  ROSEMARY: 'ROSEMARY',
  MINT: 'MINT',
  CHAMOMILE: 'CHAMOMILE',
  ALOE: 'ALOE',
  FENNEL: 'FENNEL',
} as const

export type IngredientKey =
  (typeof INGREDIENT_KEYS)[keyof typeof INGREDIENT_KEYS]

export type Ingredient = {
  id: string
  key: IngredientKey
  popularName: string
  scientificName: string
  family: string
  properties: string[]
  observation: string
  references: string
  concepts?: string[]
}