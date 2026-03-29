"use client"

import { useCauldronStore } from "@/features/drop-cauldron"
import { RemovableIngredientCard } from "./removable-ingredient-card"


export function IngredientList() {
  const ingredientsList = useCauldronStore((s) => s.ingredients)

  return (
    <div className="flex flex-col gap-2">
      <h2>Ingredientes</h2>

      {ingredientsList.map((ingredient) => (
        <RemovableIngredientCard
          key={ingredient.id}
          ingredient={ingredient}
        />
      ))}
    </div>
  )
}