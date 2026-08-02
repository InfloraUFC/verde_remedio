"use client"

import { CheckCircle2, Sparkles, XCircle } from "lucide-react"
import { TREATMENT_LABELS } from "@/entities"
import { useGameProgressStore } from "@/features/game-progress"
import { useBrewStore } from "../model"

function pickLine(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)] ?? ""
}

export function BrewResult() {
  const result = useBrewStore((s) => s.result)
  const lastMessage = useGameProgressStore((s) => s.lastMessage)
  const dismissMessage = useGameProgressStore((s) => s.dismissMessage)

  return (
    <div className="flex flex-col items-center gap-2">
      {result.status === "success" && (
        <div className="flex max-w-xs items-center gap-2 rounded-lg bg-emerald-100 px-3 py-2 text-sm text-emerald-900 ring-1 ring-emerald-900/10">
          <CheckCircle2 className="size-4 shrink-0" />
          <span>
            &ldquo;{pickLine(result.client.dialogue.success)}&rdquo; —{" "}
            <strong>{result.recipe.name}</strong> (+50★)
          </span>
        </div>
      )}

      {result.status === "partial" && (
        <div className="flex max-w-xs items-center gap-2 rounded-lg bg-amber-100 px-3 py-2 text-sm text-amber-900 ring-1 ring-amber-900/10">
          <Sparkles className="size-4 shrink-0" />
          <span>
            &ldquo;{pickLine(result.client.dialogue.partial)}&rdquo; — trata{" "}
            {TREATMENT_LABELS[result.treatmentFor]}, mas não é a receita
            certa (+25★)
          </span>
        </div>
      )}

      {result.status === "failure" && (
        <div className="flex max-w-xs items-center gap-2 rounded-lg bg-red-100 px-3 py-2 text-sm text-red-900 ring-1 ring-red-900/10">
          <XCircle className="size-4 shrink-0" />
          <span>
            &ldquo;{pickLine(result.client.dialogue.failure)}&rdquo; — perdeu
            1 vida
          </span>
        </div>
      )}

      {lastMessage && (
        <button
          onClick={dismissMessage}
          className="max-w-xs rounded-lg bg-indigo-100 px-3 py-2 text-left text-sm text-indigo-900 ring-1 ring-indigo-900/10"
        >
          {lastMessage}
        </button>
      )}
    </div>
  )
}
