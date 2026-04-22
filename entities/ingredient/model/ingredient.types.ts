export type Ingredient = {
  id: string
  popularName: string
  scientificName: string
  family: string
  properties: string[]
  observation: string
  references: string
  concepts?: string[]
  drawing_priority?: string
}