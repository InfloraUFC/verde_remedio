


// ISSO PODE SER O TIPO DE RECEITA E NÃO O INGREDIENT_KEYS, VER NA MENSAGEM DA SONIA SE O QUE CRIA ISSO SERIA O INGREDIENTE

export const INSTRUMENTS_KEYS = {
  CATAPLASM: 'CATAPLASM', // TROUXINHA
  POWDER: 'POWDER', // OIL
  SUGAR: 'SUGAR',
  TEA: 'TEA',
  BOTTLE: 'BOTTLE',
} as const

export type InstrumentKey =
  (typeof INSTRUMENTS_KEYS)[keyof typeof INSTRUMENTS_KEYS]

export type Instrument = {
  id: string
  key: InstrumentKey
}