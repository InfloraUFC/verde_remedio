"use client"

import { Instrument, InstrumentCard } from "@/entities/instruments"
import { useCauldronStore } from "@/features/drop-cauldron"
import { X } from "lucide-react"

export function RemovableInstrumentCard({ instrument }: { instrument: Instrument }) {
  const remove = useCauldronStore((s) => s.removeInstrument)

  return (
    <div className="relative">
      <InstrumentCard instrument={instrument} labelClassName="text-amber-950" />
      <button
        onClick={remove}
        className="absolute -top-1 -right-1 flex size-4 items-center justify-center rounded-full bg-red-500 text-white shadow"
        aria-label={`Remover ${instrument.key}`}
      >
        <X className="size-2.5" />
      </button>
    </div>
  )
}
