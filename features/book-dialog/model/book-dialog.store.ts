import { create } from "zustand"

type BookState = {
  page: number
  isFlipping: boolean

  nextPage: (total: number) => void
}

export const useBookStore = create<BookState>((set, get) => ({
  page: 0,
  isFlipping: false,

  nextPage: (total) => {
    if (get().isFlipping) return

    set({ isFlipping: true })

    setTimeout(() => {
      set((state) => ({
        page: (state.page + 1) % total,
        isFlipping: false,
      }))
    }, 600)
  },
}))