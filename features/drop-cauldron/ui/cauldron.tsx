"use client"

import { useDroppable } from "@dnd-kit/core"
import { useCauldronStore } from "../model"
import { cn } from "@/lib/utils"

export function Cauldron() {
  const { setNodeRef, isOver } = useDroppable({
    id: "cauldron",
  })

  const ingredients = useCauldronStore((s) => s.ingredients)
  const limit = useCauldronStore((s) => s.limit)
  const isCauldronFull = useCauldronStore((s) => s.isCauldronFull)

  const wouldOverflow = isOver && isCauldronFull()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        {/* bolhas */}
        <div className="pointer-events-none absolute inset-x-0 -top-3 flex justify-center gap-3">
          <span className="animate-cauldron-bubble size-2 rounded-full bg-emerald-300/80 [animation-delay:0s]" />
          <span className="animate-cauldron-bubble size-1.5 rounded-full bg-emerald-200/70 [animation-delay:.5s]" />
          <span className="animate-cauldron-bubble size-2.5 rounded-full bg-emerald-300/80 [animation-delay:1s]" />
        </div>

        <div
          ref={setNodeRef}
          className={cn(
            "bg-cauldron relative flex size-56 items-center justify-center rounded-[50%/45%] ring-4 ring-black/30 transition-colors sm:size-64",
            {
              "ring-emerald-400/80": isOver && !wouldOverflow,
              "ring-red-400/80": wouldOverflow,
            }
          )}
        >
          <div className="absolute inset-3 rounded-[50%/45%] ring-2 ring-white/10" />

          <span className="text-sm font-medium text-emerald-100/70">
            {ingredients.length}/{limit}
          </span>
        </div>
      </div>

      <span className="text-xs font-medium text-amber-900/70">Caldeirão</span>
    </div>
  )
}
