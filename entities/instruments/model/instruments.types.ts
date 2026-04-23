export const INSTRUMENTS_KEYS = {
  CATAPLASM: 'CATAPLASM',
  POWDER: 'POWDER',
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