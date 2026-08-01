import { create } from "zustand"
import type { CauldronState } from "./index"

export const useCauldronStore = create<CauldronState>((set, get) => ({
  ingredients: [],
  limit: 5,
  instrument: null,

  setLimit: (limit) => set({ limit }),

  isCauldronFull: () => get().ingredients.length === get().limit,

  addIngredient: (ingredient) =>
    set((state) => {
      if (state.ingredients.length >= state.limit) return state;

      if (state.ingredients.some(i => i.id === ingredient.id)) return state

      return {
        ingredients: [...state.ingredients, ingredient]
      };
    }),

  removeIngredient: (id) =>
    set((state) => ({
      ingredients: state.ingredients.filter((i) => i.id !== id),
    })),

  clearIngredients: () => set({ ingredients: [] }),

  // Só existe 1 instrumento por vez: soltar um novo substitui o anterior.
  setInstrument: (instrument) => set({ instrument }),

  removeInstrument: () => set({ instrument: null }),

  reset: () => set({ ingredients: [], instrument: null }),
}))
