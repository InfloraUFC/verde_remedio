export const IngredientTypeEnum = {
  SUGAR: 0,
  WATER: 1,
  SALT: 2,
  PLANT: 3,
} as const

export type IngredientType =
  typeof IngredientTypeEnum[keyof typeof IngredientTypeEnum]

export type Ingredient = {
  id: string
  name: string
  type: IngredientType
}