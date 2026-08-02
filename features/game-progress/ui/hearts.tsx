"use client"

import { Heart } from "lucide-react"
import { getLevel } from "@/entities/level"
import { cn } from "@/lib/utils"
import { useGameProgressStore } from "../model"

export function Hearts() {
  const lives = useGameProgressStore((s) => s.lives)
  const levelId = useGameProgressStore((s) => s.levelId)

  const maxLives = getLevel(levelId).lives

  return (
    <div className="flex gap-1" title={`${lives}/${maxLives} vidas`}>
      {Array.from({ length: maxLives }).map((_, index) => (
        <Heart
          key={index}
          className={cn(
            "size-5 transition-colors",
            index < lives ? "fill-red-500 text-red-500" : "fill-none text-red-300"
          )}
        />
      ))}
    </div>
  )
}
