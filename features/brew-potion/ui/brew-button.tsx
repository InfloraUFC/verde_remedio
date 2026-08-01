"use client"

import { FlaskConical } from "lucide-react"
import { Button } from "@/shared/ui"
import { findRecipeMatch } from "@/entities"
import { useCauldronStore } from "@/features/drop-cauldron"
import { useBrewStore } from "../model"

export function BrewButton() {
  const ingredients = useCauldronStore((s) => s.ingredients)
  const instrument = useCauldronStore((s) => s.instrument)
  const resetCauldron = useCauldronStore((s) => s.reset)
  const setResult = useBrewStore((s) => s.setResult)

  const disabled = ingredients.length === 0 || !instrument

  function handleBrew() {
    const match = findRecipeMatch(
      ingredients.map((i) => i.key),
      instrument?.key ?? null
    )

    setResult(match ? { status: "success", recipe: match } : { status: "failure" })
    resetCauldron()
  }

  return (
    <Button
      onClick={handleBrew}
      disabled={disabled}
      title={
        disabled
          ? "Solte ao menos 1 ingrediente e 1 instrumento no caldeirão"
          : "Preparar poção com o conteúdo do caldeirão"
      }
      className="gap-2"
    >
      <FlaskConical className="size-4" />
      Preparar poção
    </Button>
  )
}
