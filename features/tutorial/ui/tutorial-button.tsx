"use client"

import { HandPointerIcon } from "@/shared/ui"
import { useTutorialStore } from "../model"

export function TutorialButton() {
  const openTutorial = useTutorialStore((s) => s.openTutorial)

  return (
    <button
      onClick={openTutorial}
      title="Como jogar"
      className="flex h-10 items-center gap-1.5 rounded-full bg-brand-green px-3 text-sm font-bold text-white shadow ring-1 ring-black/20 hover:brightness-110"
    >
      <HandPointerIcon className="size-4" />
      Como jogar
    </button>
  )
}
