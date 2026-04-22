"use client"

import { Ingredient, IngredientCard } from "@/entities"
import { useDraggable } from "@dnd-kit/core"

export function DraggableIngredient({ ingredient }: { ingredient: Ingredient }) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: ingredient.id,
    data: ingredient,
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <IngredientCard ingredient={ingredient} className="cursor-grab" />
    </div>
  )
}