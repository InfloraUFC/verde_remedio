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
    <div className="bg-parchment flex flex-wrap items-center justify-center gap-3 rounded-xl px-4 py-3 ring-1 ring-black/10 shadow-inner">
      {ingredientsList.map((ingredient) => (
        <RemovableIngredientCard key={ingredient.id} ingredient={ingredient} />
      ))}

      {Array.from({ length: emptySlots }).map((_, index) => (
        <div
          key={`empty-${index}`}
          className="size-16 rounded-md border-2 border-dashed border-amber-900/25"
        />
      ))}

      <div className="mx-1 h-12 w-px bg-amber-900/15" />

      {instrument ? (
        <RemovableInstrumentCard instrument={instrument} />
      ) : (
        <div className="flex size-16 items-center justify-center rounded-md border-2 border-dashed border-amber-900/25 text-[10px] text-amber-900/40">
          instrumento
        </div>
      )}
    </div>
  )
}
