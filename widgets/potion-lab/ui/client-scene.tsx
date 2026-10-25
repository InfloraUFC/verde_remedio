"use client"

import * as React from "react"
import { CLIENTS, ClientPortrait } from "@/entities"
import { getLevel } from "@/entities/level"
import { useGameProgressStore } from "@/features/game-progress"

function pickLine(lines: string[]) {
  return lines[Math.floor(Math.random() * lines.length)] ?? ""
}

export function ClientScene() {
  const levelId = useGameProgressStore((s) => s.levelId)
  const clientIndex = useGameProgressStore((s) => s.client.clientIndex)
  // muda a cada cliente atendido (mesmo quando o nível só tem 1 cliente)
  const servedCount = useGameProgressStore((s) => s.totalStars)

  const level = getLevel(levelId)
  const clientId = level.clientIds[clientIndex % level.clientIds.length]
  const client = CLIENTS.find((c) => c.id === clientId)

  // Sorteia a fala só quando o cliente da vez muda. Antes o sorteio rodava a
  // cada render e a fala trocava sozinha (ex.: enquanto o jogador arrastava).
  const greeting = React.useMemo(
    () => (client ? pickLine(client.dialogue.greeting) : ""),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [client?.id, levelId, clientIndex, servedCount]
  )

  if (!client) return null

  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-3 rounded-xl bg-gradient-to-b from-sky-100 to-amber-50 p-4 text-center ring-1 ring-black/10">
      <ClientPortrait
        client={client}
        className="h-44 w-36 rounded-none bg-transparent ring-0"
      />

      <div className="max-w-xs rounded-2xl bg-white/90 px-4 py-2 text-sm text-amber-950 shadow ring-1 ring-black/10">
        &ldquo;{greeting}&rdquo;
      </div>
    </div>
  )
}
