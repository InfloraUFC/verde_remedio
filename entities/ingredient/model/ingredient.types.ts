export const IngredientTypeEnum = {
  FIRE: 0,
  WATER: 1,
  EARTH: 2
} as const

export type IngredientType =
  typeof IngredientTypeEnum[keyof typeof IngredientTypeEnum]

export type Ingredient = {
  id: string
  name: string
  type: IngredientType
}