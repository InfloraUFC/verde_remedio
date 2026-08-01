"use client"

import { CheckCircle2, XCircle } from "lucide-react"
import { TREATMENT_LABELS } from "@/entities"
import { useBrewStore } from "../model"

export function BrewResult() {
  const result = useBrewStore((s) => s.result)

  if (result.status === "idle") return null

  if (result.status === "success") {
    return (
      <div className="flex max-w-xs items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-900/10">
        <CheckCircle2 className="size-4 shrink-0" />
        <span>
          <strong>{result.recipe.name}</strong> preparada! Trata:{" "}
          {TREATMENT_LABELS[result.recipe.treatmentFor]}.
        </span>
      </div>
    )
  }

  return (
    <div className="flex max-w-xs items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-900 ring-1 ring-red-900/10">
      <XCircle className="size-4 shrink-0" />
      <span>Essa combinação não corresponde a nenhuma receita conhecida.</span>
    </div>
  )
}
