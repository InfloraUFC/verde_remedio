"use client"

import { Instrument, InstrumentCard } from "@/entities"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"
import { useCauldronStore } from "@/features/drop-cauldron"

export function DraggableInstrument({ instrument }: { instrument: Instrument }) {
  const { attributes, listeners, setNodeRef, isDragging } = useDraggable({
    id: instrument.id,
    data: { kind: "instrument", instrument },
  })
  const setInstrument = useCauldronStore((s) => s.setInstrument)

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      // dois cliques = atalho para colocar no caldeirão (sem arrastar)
      onDoubleClick={() => setInstrument(instrument)}
      title="Arraste até o caldeirão ou dê dois cliques"
      // Sem `touch-none` e sem `transform` aqui:
      //  - o <DragOverlay> já desenha o item sendo arrastado; mover o original
      //    também fazia a lista de plantas "esticar"/rolar sozinha;
      //  - `touch-none` bloqueava o scroll por toque dentro das prateleiras
      //    (o arraste por toque usa long-press, ver sensores no PotionLab).
      className={cn(
        "flex w-full flex-col items-center select-none [-webkit-touch-callout:none]",
        isDragging && "opacity-40"
      )}
    >
      <InstrumentCard
        instrument={instrument}
        className="w-full cursor-grab active:cursor-grabbing hover:-translate-y-0.5"
      />
      <div className="h-1.5 w-20 rounded-full shelf-plank" />
    </div>
  )
}
