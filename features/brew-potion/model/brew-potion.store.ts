import { create } from "zustand"
import { Client, Recipe, TreatmentForType } from "@/entities"

export type BrewFeedback =
  | { status: "idle" }
  | { status: "success"; recipe: Recipe; client: Client }
  | { status: "partial"; treatmentFor: TreatmentForType; client: Client }
  | { status: "failure"; client: Client }

type BrewState = {
  result: BrewFeedback
  setResult: (result: BrewFeedback) => void
  reset: () => void
}

export const useBrewStore = create<BrewState>((set) => ({
  result: { status: "idle" },
  setResult: (result) => set({ result }),
  reset: () => set({ result: { status: "idle" } }),
}))
