import { DraggableIngredient } from "@/features"
import { Ingredient } from "@/entities"

type Props = {
  plants: Ingredient[]
}

export function PlantShelf({ plants }: Props) {
  return (
    <div className="bg-wood-panel flex min-h-0 w-full max-w-60 flex-1 flex-col rounded-xl ring-1 ring-black/30 shadow-lg overflow-hidden max-h-[55vh]">
      <span className="pt-3 text-center text-[11px] font-bold tracking-wider text-amber-100/90 uppercase drop-shadow-sm">
        Plantas
      </span>

      <div className="flex min-h-0 flex-1 flex-col items-center gap-3 overflow-y-auto overflow-x-hidden max-w-60 p-3">
        {plants.map((plant) => (
          <DraggableIngredient key={plant.id} ingredient={plant} />
        ))}
      </div>
    </div>
  )
}
