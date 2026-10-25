import { DraggableIngredient } from "@/features"
import { Ingredient } from "@/entities"
import { HandPointerIcon } from "@/shared/ui"

type Props = {
  plants: Ingredient[]
}

export function PlantShelf({ plants }: Props) {
  return (
    <div className="bg-wood-panel flex min-h-0 w-full max-w-60 flex-1 flex-col rounded-xl ring-1 ring-black/30 shadow-lg overflow-hidden max-h-[55vh]">
      <span className="pt-3 text-center text-[11px] font-bold tracking-wider text-amber-100/90 uppercase drop-shadow-sm">
        Plantas
      </span>
      <span className="flex items-center justify-center gap-1 pb-1 text-[11px] text-amber-100/80">
        <HandPointerIcon className="size-3" />
        arraste ou dê 2 cliques
      </span>

      <div className="scroll-thin flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto overflow-x-hidden overscroll-contain p-3">
        {plants.map((plant) => (
          <DraggableIngredient key={plant.id} ingredient={plant} />
        ))}
      </div>
    </div>
  )
}
