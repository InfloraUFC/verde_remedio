// INGREDIENTES SÃO PLANTAS, ÁGUA, ÓLEO e ÁLCOOL

export const INGREDIENT_KINDS = {
  PLANT: 'PLANT',
  WATER: 'WATER',
  OIL: 'OIL',
  ALCOHOL: 'ALCOHOL',
} as const

export type IngredientKind =
  (typeof INGREDIENT_KINDS)[keyof typeof INGREDIENT_KINDS]

export const INGREDIENT_KEYS = {
  // Ingredientes-base (não são plantas)
  WATER: 'WATER',
  OIL: 'OIL',
  ALCOHOL: 'ALCOHOL',

  // Plantas
  ANGICO: 'ANGICO',
  GUINE: 'GUINE',
  JURUBEBA: 'JURUBEBA',
  JATOBA: 'JATOBA',
  HORTELA: 'HORTELA',
  ROMA: 'ROMA',
  ASSA_PEIXE: 'ASSA_PEIXE',
  MASTRUCO: 'MASTRUCO',
  CAJUEIRO: 'CAJUEIRO',
  AROEIRA: 'AROEIRA',
  BARBATIMAO: 'BARBATIMAO',
  CASCA_DE_ANTA: 'CASCA_DE_ANTA',
  ACAFRAO_DA_TERRA: 'ACAFRAO_DA_TERRA',
  QUINA_DO_CERRADO: 'QUINA_DO_CERRADO',
  GENGIBRE: 'GENGIBRE',
} as const

export type IngredientKey =
  (typeof INGREDIENT_KEYS)[keyof typeof INGREDIENT_KEYS]

export type Ingredient = {
  id: string
  key: IngredientKey
  kind: IngredientKind

  popularName: string
  image?: string

  // Campos abaixo só fazem sentido para ingredientes do tipo PLANT
  scientificName?: string
  family?: string

  properties: string[]
  observation?: string
  references?: string
  concepts?: string[]
}
