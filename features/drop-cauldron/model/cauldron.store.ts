import { create } from "zustand"
import type { CauldronState } from "./index"

export const useCauldronStore = create<CauldronState>((set) => ({
  ingredients: [],
  limit: 4,

  setLimit: (limit) => set({ limit }),

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

  clear: () => set({ ingredients: [] }),
}))