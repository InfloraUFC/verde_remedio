import { INSTRUMENTS } from "./instruments.constants"
import { InstrumentKey } from "./instruments.types"

export const getInstrumentByKey = (key: InstrumentKey) => {
  return INSTRUMENTS[key]
}