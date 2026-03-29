import { Ingredient } from "../model"

type Props = {
  ingredient: Ingredient
  rightSlot?: React.ReactNode
}

export function IngredientCard({ ingredient, rightSlot }: Props) {
  return (
    <div className="flex justify-between items-center border p-2 rounded">
      <span>{ingredient.name}</span>

      {rightSlot}
    </div>
  )
}