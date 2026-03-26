"use client"

import { useDraggable } from "@dnd-kit/core"
import { CSS } from "@dnd-kit/utilities"
import { Ingredient } from "@/entities"

type Props = {
  ingredient: Ingredient
}

export function IngredientCard({ ingredient }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useDraggable({
    id: ingredient.id,
    data: ingredient,
  })

  const style = {
    transform: CSS.Translate.toString(transform),
    opacity: isDragging ? 0 : 1,
  }

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      aria-describedby={ingredient.name}
      className={`
        px-3 py-2
        border rounded
        bg-white
        shadow-sm
        cursor-grab
        active:cursor-grabbing
        transition-all
      `}
    >
      {ingredient.name}
    </div>
  )
}