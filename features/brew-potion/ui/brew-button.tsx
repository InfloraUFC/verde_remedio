"use client"

import { FlaskConical } from "lucide-react"
import { Button } from "@/shared/ui"
import { CLIENTS, findRecipeMatch, treatsCondition } from "@/entities"
import { getLevel } from "@/entities/level"
import { useCauldronStore } from "@/features/drop-cauldron"
import { useGameProgressStore } from "@/features/game-progress"
import { useBrewStore } from "../model"

export function BrewButton() {
  const ingredients = useCauldronStore((s) => s.ingredients)
  const instrument = useCauldronStore((s) => s.instrument)
  const resetCauldron = useCauldronStore((s) => s.reset)
  const setResult = useBrewStore((s) => s.setResult)

  const levelId = useGameProgressStore((s) => s.levelId)
  const clientIndex = useGameProgressStore((s) => s.client.clientIndex)
  const attempts = useGameProgressStore((s) => s.client.attempts)
  const registerBrewAttempt = useGameProgressStore((s) => s.registerBrewAttempt)

  const disabled = ingredients.length === 0 || !instrument

  function handleBrew() {
    if (!instrument) return

    const level = getLevel(levelId)
    const clientId = level.clientIds[clientIndex % level.clientIds.length]
    const client = CLIENTS.find((c) => c.id === clientId)
    if (!client) return

    const targetTreatment = client.conditions[0].treatmentFor
    const ingredientKeys = ingredients.map((i) => i.key)

    const exactMatch = findRecipeMatch(ingredientKeys, instrument.key)
    const isExactForClient = exactMatch?.treatmentFor === targetTreatment

    // acerto total: receita exata E que trata a condição desse cliente
    if (isExactForClient && exactMatch) {
      setResult({ status: "success", recipe: exactMatch, client })
      registerBrewAttempt("success")
      resetCauldron()
      return
    }

    // acerto parcial: instrumento certo pra essa condição, mas só libera
    // depois de já ter errado esse cliente pelo menos 1 vez
    const canBePartial =
      attempts > 0 && treatsCondition(instrument.key, targetTreatment)

    if (canBePartial) {
      setResult({ status: "partial", treatmentFor: targetTreatment, client })
      registerBrewAttempt("partial")
      resetCauldron()
      return
    }

    setResult({ status: "failure", client })
    registerBrewAttempt("failure")
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
