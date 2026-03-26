// widgets/potion-lab/ui/ingredient-sidebar.tsx

"use client"

import { IngredientCard } from "@/features/drag-ingredient/ui/ingredient-card"
import { Ingredient } from "@/entities"

type Props = {
  ingredients: Ingredient[]
}

export function IngredientSidebar({ ingredients }: Props) {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="font-bold">Ingredientes</h2>

      {ingredients.map((ingredient) => (
        <IngredientCard
          key={ingredient.id}
          ingredient={ingredient}
        />
      ))}
    </div>
  )
}