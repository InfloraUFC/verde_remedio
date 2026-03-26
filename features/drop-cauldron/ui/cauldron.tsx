"use client"

import { useDroppable } from "@dnd-kit/core"
import { useCauldronStore } from "../model/cauldron.store"
import { generateUUID } from "@/lib/utils"

export function Cauldron() {
  const { setNodeRef, isOver } = useDroppable({
    id: "cauldron",
  })

  const ingredients = useCauldronStore((state) => state.ingredients)

  return (
    <div
      ref={setNodeRef}
      className={`
        w-75 h-75
        rounded-full
        border-4
        flex items-center justify-center
        ${isOver ? "bg-green-200" : "bg-gray-200"}
      `}
    >
      <div>
        {ingredients.length === 0 && <p>Vazio</p>}

        {ingredients.map((i) => (
          <div key={generateUUID()}>{i.name}</div>
        ))}
      </div>
    </div>
  )
}