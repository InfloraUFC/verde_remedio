"use client"

import { Volume2, VolumeX } from "lucide-react"
import { useSoundSettingsStore } from "../model"

export function SoundToggle() {
  const muted = useSoundSettingsStore((s) => s.muted)
  const toggleMuted = useSoundSettingsStore((s) => s.toggleMuted)

  return (
    <button
      onClick={toggleMuted}
      title={muted ? "Ativar som" : "Desativar som"}
      className="grid size-10 place-items-center rounded-full bg-amber-950/80 text-amber-50 shadow ring-1 ring-black/20 hover:bg-amber-950"
    >
      {muted ? <VolumeX className="size-5" /> : <Volume2 className="size-5" />}
    </button>
  )
}
