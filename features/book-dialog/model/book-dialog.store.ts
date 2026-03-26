import { create } from "zustand"

type BookState = {
  spread: number
  isFlipping: boolean

  nextPage: (total: number) => void
}

export const useBookStore = create<BookState>((set, get) => ({
  spread: 0,
  isFlipping: false,

  nextPage: (total) => {
    if (get().isFlipping) return

    set({ isFlipping: true })

    setTimeout(() => {
      set((state) => ({
        spread: (state.spread + 1) % total,
        isFlipping: false,
      }))
    }, 600)
  },
}))