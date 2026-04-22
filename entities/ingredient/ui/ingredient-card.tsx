import { cn } from "@/lib/utils"
import { Ingredient } from "../model"

interface Props extends React.HTMLAttributes<HTMLDivElement> {
  ingredient: Ingredient
  rightSlot?: React.ReactNode
}

export function IngredientCard({ ingredient, rightSlot, ...props }: Props) {
  return (
    <div {...props} className={cn("flex justify-between items-center border p-2 rounded cursor-default", props.className)}>
      <span>{ingredient.popularName}</span>

      {rightSlot}
    </div>
  )
}