export type LevelConfig = {
  id: number
  starsRequired: number
  lives: number
  /** ids de entities/client, na ordem em que os clientes aparecem no nível */
  clientIds: string[]
  /** ids de entities/recipes liberadas neste nível */
  recipeIds: string[]
}
