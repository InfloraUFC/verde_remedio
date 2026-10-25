"use client"

import { useDroppable } from "@dnd-kit/core"
import { CauldronIcon } from "@/shared/ui"
import { useCauldronStore } from "../model"
import { cn } from "@/lib/utils"

export function Cauldron() {
  const { setNodeRef, isOver } = useDroppable({
    id: "cauldron",
  })

  const isCauldronFull = useCauldronStore((s) => s.isCauldronFull)

  const wouldOverflow = isOver && isCauldronFull()

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="relative">
        <div
          ref={setNodeRef}
          className={cn(
            "bg-cauldron relative flex size-40 items-center justify-center rounded-[50%/45%] ring-4 ring-black/30 transition-colors sm:size-52",
            {
              "ring-emerald-400/80": isOver && !wouldOverflow,
              "ring-red-400/80": wouldOverflow,
            }
          )}
        >
          <div className="absolute inset-3 rounded-[50%/45%] ring-2 ring-white/10" />

          {/* ícone decorativo: indica onde soltar os itens */}
          <CauldronIcon className="size-12 text-emerald-100/25" />
        </div>
      </div>

      <span className="text-xs font-medium text-amber-900/70">Caldeirão</span>
    </div>
  )
}
