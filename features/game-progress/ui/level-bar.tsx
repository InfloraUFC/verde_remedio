"use client"

import { getLevel, isLastLevel } from "@/entities/level"
import { useGameProgressStore } from "../model"

export function LevelBar() {
  const levelId = useGameProgressStore((s) => s.levelId)
  const stars = useGameProgressStore((s) => s.stars)

  const level = getLevel(levelId)
  const progress = Math.min(100, (stars / level.starsRequired) * 100)

  return (
    <div className="flex items-center gap-2">
      <span className="grid size-6 place-items-center rounded-full bg-emerald-700 text-xs font-bold text-white">
        {levelId}
      </span>

      <div className="h-3 w-40 overflow-hidden rounded-full bg-emerald-950/15 ring-1 ring-black/10">
        <div
          className="h-full rounded-full bg-emerald-500 transition-all"
          style={{ width: `${progress}%` }}
        />
      </div>

      {!isLastLevel(levelId) && (
        <span className="grid size-6 place-items-center rounded-full bg-emerald-700/40 text-xs font-bold text-white">
          {levelId + 1}
        </span>
      )}

      <span className="text-xs font-medium text-amber-900/70">
        {stars}/{level.starsRequired}★
      </span>
    </div>
  )
}
