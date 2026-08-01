import { describe, expect, it } from "vitest"
import { findRecipeMatch } from "./recipes.model"
import { RECIPES } from "./recipes.constants"
import { INSTRUMENTS_KEYS } from "@/entities/instruments"
import { INGREDIENT_KEYS } from "@/entities/ingredient"

describe("findRecipeMatch", () => {
  it("returns null when there is no instrument", () => {
    expect(
      findRecipeMatch([INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ANGICO], null)
    ).toBeNull()
  })

  it("returns null when there are no ingredients", () => {
    expect(findRecipeMatch([], INSTRUMENTS_KEYS.SUGAR)).toBeNull()
  })

  it("matches the exact ingredient set + instrument of a known recipe", () => {
    const match = findRecipeMatch(
      [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ANGICO],
      INSTRUMENTS_KEYS.SUGAR
    )

    expect(match?.id).toBe(RECIPES[0].id)
  })

  it("ignores ingredient order", () => {
    const match = findRecipeMatch(
      [INGREDIENT_KEYS.ANGICO, INGREDIENT_KEYS.WATER],
      INSTRUMENTS_KEYS.SUGAR
    )

    expect(match?.id).toBe(RECIPES[0].id)
  })

  it("does not match when the instrument is wrong", () => {
    const match = findRecipeMatch(
      [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ANGICO],
      INSTRUMENTS_KEYS.TEA
    )

    expect(match).toBeNull()
  })

  it("does not match when ingredients are missing or extra", () => {
    expect(
      findRecipeMatch([INGREDIENT_KEYS.WATER], INSTRUMENTS_KEYS.SUGAR)
    ).toBeNull()

    expect(
      findRecipeMatch(
        [INGREDIENT_KEYS.WATER, INGREDIENT_KEYS.ANGICO, INGREDIENT_KEYS.OIL],
        INSTRUMENTS_KEYS.SUGAR
      )
    ).toBeNull()
  })
})
