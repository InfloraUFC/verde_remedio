"use client"

import { Ingredient, IngredientCard } from "@/entities/ingredient"
import { useCauldronStore } from "@/features/drop-cauldron"
import { X } from "lucide-react"

export function RemovableIngredientCard({ ingredient }: { ingredient: Ingredient }) {
  const remove = useCauldronStore((s) => s.removeIngredient)

  return (
    <IngredientCard
      ingredient={ingredient}
      rightSlot={
        <button onClick={() => remove(ingredient.id)}>
          <X />
        </button>
      }
    />
  )
}