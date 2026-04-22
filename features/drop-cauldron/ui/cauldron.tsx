"use client"

import { useDroppable } from "@dnd-kit/core"
import { useCauldronStore } from "../model"
import { cn } from "@/lib/utils"

export function Cauldron() {
  const { setNodeRef, isOver } = useDroppable({
    id: "cauldron",
  })

  const isCauldronFull = useCauldronStore((s) => s.isCauldronFull)

  return (
    <div
      ref={setNodeRef}
      className={cn(
        'w-75 h-75 rounded-full border-4 flex items-center justify-center bg-gray-200',
        {
          "bg-green-200": isOver && !isCauldronFull(),
          "bg-red-200": isOver && isCauldronFull(),
        }
      )}
    />
  )
}