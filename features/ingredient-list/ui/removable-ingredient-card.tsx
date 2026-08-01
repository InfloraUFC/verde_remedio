"use client"

import { Ingredient, IngredientCard } from "@/entities/ingredient"
import { useCauldronStore } from "@/features/drop-cauldron"
import { X } from "lucide-react"

export function RemovableIngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const remove = useCauldronStore((s) => s.removeIngredient)

  return (
    <IngredientCard
      ingredient={ingredient}
      labelClassName="text-amber-950"
      rightSlot={
        <button
          onClick={() => remove(ingredient.id)}
          className="flex size-4 items-center justify-center rounded-full bg-red-500 text-white shadow"
          aria-label={`Remover ${ingredient.popularName}`}
        >
          <X className="size-2.5" />
        </button>
      }
    />
  )
}
