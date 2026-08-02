"use client"

import { CLIENTS, ClientPortrait, TREATMENT_LABELS } from "@/entities"
import { getLevel } from "@/entities/level"
import { useGameProgressStore } from "@/features/game-progress"

function pickLine(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)] ?? ""
}

export function ClientScene() {
  const levelId = useGameProgressStore((s) => s.levelId)
  const clientIndex = useGameProgressStore((s) => s.client.clientIndex)

  const level = getLevel(levelId)
  const clientId = level.clientIds[clientIndex % level.clientIds.length]
  const client = CLIENTS.find((c) => c.id === clientId)

  if (!client) return null

  const condition = client.conditions[0]

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-sky-100 to-amber-50 p-4 text-center ring-1 ring-black/10">
      <ClientPortrait client={client} className="size-24" />

      <div className="max-w-xs rounded-2xl bg-white/90 px-4 py-2 text-sm text-amber-950 shadow ring-1 ring-black/10">
        &ldquo;{pickLine(client.dialogue.greeting)}&rdquo;
      </div>

      <p className="text-xs text-amber-900/70">
        <strong>{client.name.split(" ")[0]}</strong> precisa de algo para{" "}
        <strong>{TREATMENT_LABELS[condition.treatmentFor]}</strong>
      </p>
    </div>
  )
}
