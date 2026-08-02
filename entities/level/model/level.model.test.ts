import { describe, expect, it } from "vitest"
import { getLevel, getUnlockedInstrumentKeys, getUnlockedPlantKeys, isLastLevel } from "./level.model"
import { LEVELS } from "./level.constants"

describe("level.model", () => {
  it("has 7 levels with non-decreasing star requirements", () => {
    expect(LEVELS).toHaveLength(7)
    const requirements = LEVELS.map((l) => l.starsRequired)
    expect(requirements).toEqual([...requirements].sort((a, b) => a - b))
  })

  it("getLevel falls back to level 1 for unknown ids", () => {
    expect(getLevel(999).id).toBe(1)
  })

  it("isLastLevel is true only for the final level", () => {
    expect(isLastLevel(7)).toBe(true)
    expect(isLastLevel(6)).toBe(false)
  })

  it("derives unlocked plants strictly from the level's recipes", () => {
    const plants = getUnlockedPlantKeys(getLevel(1)).sort()
    expect(plants).toEqual(["GUINE", "JURUBEBA"].sort())
  })

  it("never removes content already unlocked in a previous level", () => {
    for (let id = 2; id <= 7; id++) {
      const previous = new Set(getUnlockedPlantKeys(getLevel(id - 1)))
      const current = new Set(getUnlockedPlantKeys(getLevel(id)))
      for (const key of previous) expect(current.has(key)).toBe(true)
    }
  })

  it("derives unlocked instruments from the level's recipes", () => {
    expect(getUnlockedInstrumentKeys(getLevel(1))).toEqual(["TEA"])
  })

  it("the final level unlocks all 10 recipes", () => {
    expect(getLevel(7).recipeIds).toHaveLength(10)
  })
})
