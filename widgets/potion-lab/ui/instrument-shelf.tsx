import { Instrument } from "@/entities"
import { DraggableInstrument } from "@/features"

type Props = {
  instruments: Instrument[]
}

export function InstrumentShelf({ instruments }: Props) {
  return (
    <div className="bg-wood-panel flex min-h-0 w-full max-w-60 flex-1 flex-col rounded-xl ring-1 ring-black/30 shadow-lg">
      <span className="pt-3 text-center text-[11px] font-bold tracking-wider text-amber-100/90 uppercase drop-shadow-sm">
        Instrumentos
      </span>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto p-3">
        {instruments.map((instrument) => (
          <DraggableInstrument key={instrument.id} instrument={instrument} />
        ))}
      </div>
    </div>
  )
}
