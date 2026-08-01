import { Instrument, InstrumentKey, INSTRUMENTS_KEYS } from "./instruments.types";

export const INSTRUMENTS_BY_KEYS: Instrument[] = [
  { id: 'instrument-1', key: INSTRUMENTS_KEYS.CATAPLASM },
  { id: 'instrument-2', key: INSTRUMENTS_KEYS.POWDER },
  { id: 'instrument-3', key: INSTRUMENTS_KEYS.SUGAR },
  { id: 'instrument-4', key: INSTRUMENTS_KEYS.TEA },
  { id: 'instrument-5', key: INSTRUMENTS_KEYS.BOTTLE },
];

export const INSTRUMENTS: Record<
  InstrumentKey,
  {
    name: string
    type: string
    img: string
  }
> = {
  CATAPLASM: {
    name: 'trouxinha',
    type: 'cataplasma',
    img: '/images/instruments/cataplasm.png',
  },
  POWDER: {
    name: 'pilão',
    type: 'pó',
    img: '/images/instruments/powder.png',
  },
  SUGAR: {
    name: 'açúcar',
    type: 'lambedor',
    img: '/images/instruments/sugar.png',
  },
  TEA: {
    name: 'chaleira',
    type: 'chá',
    img: '/images/instruments/tea.png',
  },
  BOTTLE: {
    name: 'garrafa',
    type: 'garrafada',
    img: '/images/instruments/bottle.png',
  },
}