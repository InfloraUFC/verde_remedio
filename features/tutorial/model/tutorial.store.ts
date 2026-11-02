import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

/**
 * Controla o pop-up de tutorial ("Como jogar").
 * - abre sozinho na primeira vez que o jogador chega no jogo;
 * - pode ser reaberto a qualquer momento pelo botão de ajuda.
 * Só `seen` é persistido (localStorage).
 */
type TutorialState = {
  open: boolean
  seen: boolean
  openTutorial: () => void
  closeTutorial: () => void
}

export const useTutorialStore = create<TutorialState>()(
  persist(
    (set) => ({
      open: false,
      seen: false,
      openTutorial: () => set({ open: true }),
      closeTutorial: () => set({ open: false, seen: true }),
    }),
    {
      name: "verde-remedio-tutorial",
      storage: createJSONStorage(() => localStorage),
      partialize: (state) => ({ seen: state.seen }),
      skipHydration: true,
    }
  )
)
