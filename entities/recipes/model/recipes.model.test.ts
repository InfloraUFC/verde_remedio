import { describe, expect, it } from "vitest"
import { findRecipeMatch, isRecipeOverused, MAX_RECIPE_USES } from "./recipes.model"
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

describe("isRecipeOverused", () => {
  const byId = (id: string) => RECIPES.find((r) => r.id === id)!
  // 2 = chá de guiné, 3 = chá de jurubeba, 9 = cataplasma — todas p/ artrite
  const arthritis = [byId("2"), byId("3"), byId("9")]

  it("não recusa antes do limite", () => {
    expect(isRecipeOverused(byId("2"), { "2": MAX_RECIPE_USES - 1 }, arthritis)).toBe(false)
  })

  it("recusa na 3ª vez quando existe outra receita disponível", () => {
    expect(isRecipeOverused(byId("2"), { "2": MAX_RECIPE_USES }, arthritis)).toBe(true)
  })

  it("não recusa se não há alternativa (evita softlock)", () => {
    expect(isRecipeOverused(byId("2"), { "2": 2 }, [byId("2")])).toBe(false)
    expect(
      isRecipeOverused(byId("2"), { "2": 2, "3": 2, "9": 2 }, arthritis)
    ).toBe(false)
  })

  it("alternativa de outra condição não conta", () => {
    expect(isRecipeOverused(byId("2"), { "2": 2 }, [byId("2"), byId("8")])).toBe(false)
  })
})
