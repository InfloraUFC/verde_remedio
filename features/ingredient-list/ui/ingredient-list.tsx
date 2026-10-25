"use client"

import { useCauldronStore } from "@/features/drop-cauldron"
import { RemovableIngredientCard } from "./removable-ingredient-card"
import { RemovableInstrumentCard } from "./removable-instrument-card"

export function IngredientList() {
  const ingredientsList = useCauldronStore((s) => s.ingredients)
  const limit = useCauldronStore((s) => s.limit)
  const instrument = useCauldronStore((s) => s.instrument)

  const emptySlots = Math.max(limit - ingredientsList.length, 0)

  return (
    <div className="bg-parchment flex flex-wrap items-center justify-center gap-2 rounded-xl px-3 py-2 ring-1 ring-black/10 shadow-inner">
      {ingredientsList.map((ingredient) => (
        <RemovableIngredientCard key={ingredient.id} ingredient={ingredient} />
      ))}

      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="size-12 rounded-md border-2 border-dashed border-amber-900/25"
        />
      ))}

      <div className="mx-0.5 h-9 w-px bg-amber-900/15" />

      {instrument ? (
        <RemovableInstrumentCard instrument={instrument} />
      ) : (
        <div className="flex size-12 items-center justify-center rounded-md border-2 border-dashed border-amber-900/25 text-[9px] text-amber-900/40">
          utensílio
        </div>
      )}
    </div>
  )
}
