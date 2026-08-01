import { create } from "zustand"
import { Recipe } from "@/entities"

export type BrewOutcome =
  | { status: "idle" }
  | { status: "success"; recipe: Recipe }
  | { status: "failure" }

type BrewState = {
  result: BrewOutcome
  setResult: (result: BrewOutcome) => void
  reset: () => void
}

export const useBrewStore = create<BrewState>((set) => ({
  result: { status: "idle" },
  setResult: (result) => set({ result }),
  reset: () => set({ result: { status: "idle" } }),
}))
