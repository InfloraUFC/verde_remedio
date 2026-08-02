import { INGREDIENT_KEYS, IngredientKey } from "@/entities/ingredient"
import { InstrumentKey } from "@/entities/instruments"
import { RECIPES } from "@/entities/recipes"
import { LEVELS } from "./level.constants"
import { LevelConfig } from "./level.types"

const BASE_KEYS: readonly IngredientKey[] = [
  INGREDIENT_KEYS.WATER,
  INGREDIENT_KEYS.OIL,
  INGREDIENT_KEYS.ALCOHOL,
]

export function getLevel(id: number): LevelConfig {
  return LEVELS.find((level) => level.id === id) ?? LEVELS[0]
}

export function isLastLevel(id: number): boolean {
  return id >= LEVELS[LEVELS.length - 1].id
}

export function getUnlockedRecipes(level: LevelConfig) {
  return RECIPES.filter((recipe) => level.recipeIds.includes(recipe.id))
}

/**
 * Plantas liberadas no nível = união das plantas usadas pelas receitas
 * liberadas (as bases água/óleo/álcool não entram aqui, ver `BASE_KEYS`
 * — elas ficam sempre disponíveis, independente de nível).
 */
export function getUnlockedPlantKeys(level: LevelConfig): IngredientKey[] {
  const keys = new Set<IngredientKey>()

  for (const recipe of getUnlockedRecipes(level)) {
    for (const key of recipe.ingredients) {
      if (!BASE_KEYS.includes(key)) keys.add(key)
    }
  }

  return Array.from(keys)
}

export function getUnlockedInstrumentKeys(level: LevelConfig): InstrumentKey[] {
  const keys = new Set<InstrumentKey>()

  for (const recipe of getUnlockedRecipes(level)) {
    keys.add(recipe.type)
  }

  return Array.from(keys)
}
