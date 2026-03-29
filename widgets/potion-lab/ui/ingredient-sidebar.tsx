"use client"

import { DraggableIngredient } from "@/features/drag-ingredient/ui/draggable-ingredient-card"
import { Ingredient } from "@/entities"

type Props = {
  ingredients: Ingredient[]
}

export function IngredientSidebar({ ingredients }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Ingredientes</h2>

      {ingredients.map((ingredient) => (
        <DraggableIngredient
          key={ingredient.id}
          ingredient={ingredient}
        />
      ))}
    </div>
  )
}