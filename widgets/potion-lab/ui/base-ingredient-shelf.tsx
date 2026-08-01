import { DraggableIngredient } from "@/features"
import { Ingredient } from "@/entities"

type Props = {
  bases: Ingredient[]
}

export function BaseIngredientShelf({ bases }: Props) {
  return (
    <div className="bg-wood-panel flex w-full max-w-60 flex-col rounded-xl ring-1 ring-black/30 shadow-lg overflow-hidden">
      <span className="pt-3 text-center text-[11px] font-bold tracking-wider text-amber-100/90 uppercase drop-shadow-sm">
        Bases
      </span>

      <div className="flex max-h-115 flex-col items-center gap-3 overflow-y-auto p-3">
        {bases.map((base) => (
          <DraggableIngredient key={base.id} ingredient={base} />
        ))}
      </div>
    </div>
  )
}
