import { Droplets, FlaskConical, Leaf, Wine } from "lucide-react"
import { ItemImage } from "@/shared/ui"
import { cn } from "@/lib/utils"
import { Ingredient, INGREDIENT_KINDS } from "../model"

const FALLBACK_ICON: Record<Ingredient["kind"], React.ReactNode> = {
  [INGREDIENT_KINDS.PLANT]: <Leaf className="size-6" />,
  [INGREDIENT_KINDS.WATER]: <Droplets className="size-6" />,
  [INGREDIENT_KINDS.OIL]: <FlaskConical className="size-6" />,
  [INGREDIENT_KINDS.ALCOHOL]: <Wine className="size-6" />,
}

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ingredient: Ingredient
  rightSlot?: React.ReactNode
  labelClassName?: string
}

export function IngredientCard({
  ingredient,
  rightSlot,
  labelClassName,
  ...props
}: Props) {
  return (
    <div
      {...props}
      className={cn(
        "group flex flex-col items-center gap-1 rounded-lg p-1.5 transition-colors",
        props.className
      )}
    >
      <div className="relative">
        <ItemImage
          src={ingredient.image}
          alt={ingredient.popularName}
          icon={FALLBACK_ICON[ingredient.kind]}
          className="size-24 rounded-md bg-white/70 shadow-inner ring-1 ring-black/10 text-emerald-800 group-hover:ring-emerald-500/60"
        />
        {rightSlot && (
          <div className="absolute -top-1.5 -right-1.5">{rightSlot}</div>
        )}
      </div>

      <span
        className={cn(
          "max-w-24 truncate text-center text-[11px] font-medium text-amber-50 drop-shadow-sm",
          labelClassName
        )}
      >
        {ingredient.popularName}
      </span>
    </div>
  )
}
