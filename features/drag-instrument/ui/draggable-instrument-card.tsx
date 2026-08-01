"use client"

import { Instrument, InstrumentCard } from "@/entities"
import { useDraggable } from "@dnd-kit/core"
import { cn } from "@/lib/utils"

export function DraggableInstrument({ instrument }: { instrument: Instrument }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: instrument.id,
    data: { kind: "instrument", instrument },
  })

  return (
    <div
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      className={cn(
        "flex w-full flex-col items-center touch-none",
        isDragging && "opacity-40"
      )}
      style={{
        transform: transform
          ? `translate(${transform.x}px, ${transform.y}px)`
          : undefined,
      }}
    >
      <InstrumentCard
        instrument={instrument}
        className="w-full cursor-grab active:cursor-grabbing hover:-translate-y-0.5"
      />
      <div className="h-1.5 w-20 rounded-full shelf-plank" />
    </div>
  )
}
