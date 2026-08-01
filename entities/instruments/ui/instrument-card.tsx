import { Bandage, Candy, CupSoda, FlaskRound, Sparkles } from "lucide-react"
import { ItemImage } from "@/shared/ui"
import { cn } from "@/lib/utils"
import { getInstrumentByKey, Instrument, INSTRUMENTS_KEYS } from "../model"

const FALLBACK_ICON: Record<Instrument["key"], React.ReactNode> = {
  [INSTRUMENTS_KEYS.SUGAR]: <Candy className="size-6" />,
  [INSTRUMENTS_KEYS.TEA]: <CupSoda className="size-6" />,
  [INSTRUMENTS_KEYS.CATAPLASM]: <Bandage className="size-6" />,
  [INSTRUMENTS_KEYS.BOTTLE]: <FlaskRound className="size-6" />,
  [INSTRUMENTS_KEYS.POWDER]: <Sparkles className="size-6" />,
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  instrument: Instrument
  labelClassName?: string
}

export function InstrumentCard({ instrument, labelClassName, ...props }: Props) {
  const data = getInstrumentByKey(instrument.key)

  return (
    <div
      {...props}
      className={cn(
        "group flex flex-col items-center gap-1 rounded-lg p-1.5",
        props.className
      )}
    >
      <ItemImage
        src={data.img}
        alt={data.name}
        icon={FALLBACK_ICON[instrument.key]}
        className="size-24 rounded-md bg-white/70 shadow-inner ring-1 ring-black/10 text-amber-900 group-hover:ring-amber-500/60"
      />

      <span
        className={cn(
          "max-w-24 truncate text-center text-[11px] font-medium text-amber-50 capitalize drop-shadow-sm",
          labelClassName
        )}
      >
        {data.name}
      </span>
    </div>
  )
}
