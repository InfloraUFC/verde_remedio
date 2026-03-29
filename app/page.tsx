// app/potion/page.tsx

import { IngredientList } from "@/features"
import { PotionLab } from "@/widgets"

export default function Home() {
  return (
    <>
      <PotionLab />
      <IngredientList />
    </>
  )
}