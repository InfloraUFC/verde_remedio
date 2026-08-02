"use client"

import { useEffect, useState } from "react"
import { useGameProgressStore } from "./game-progress.store"

/**
 * `persist` está com `skipHydration: true` de propósito: sem isso, o
 * Next.js reclama de hydration mismatch (servidor não tem acesso ao
 * localStorage). Esse hook dispara a reidratação manualmente já no
 * client, e só então libera a leitura do estado real.
 */
export function useHydrateGameProgress() {
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    useGameProgressStore.persist.rehydrate()
    setHydrated(true)
  }, [])

  return hydrated
}
