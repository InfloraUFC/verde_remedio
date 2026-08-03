import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"
import { getLevel, isLastLevel } from "@/entities/level"

export type BrewTier = "success" | "partial" | "failure"

type ClientProgress = {
  clientIndex: number
  /** tentativas já feitas nesse cliente — acerto parcial só libera após >0 */
  attempts: number
}

export type GameStatus = "playing" | "gameOver" | "victory"

type GameProgressState = {
  levelId: number
  stars: number
  /** placar total, nunca reseta — inclui os bônus de livro */
  totalStars: number
  lives: number
  bookOpenedThisLevel: boolean
  client: ClientProgress
  status: GameStatus
  /** última mensagem de "meta-jogo" (subiu de nível, perdeu tudo, venceu...) */
  lastMessage: string | null

  markBookOpened: () => void
  registerBrewAttempt: (tier: BrewTier) => void
  dismissMessage: () => void
  resetGame: () => void
}

function freshLevelState(levelId: number) {
  const level = getLevel(levelId)

  return {
    levelId,
    stars: 0,
    lives: level.lives,
    bookOpenedThisLevel: false,
    client: { clientIndex: 0, attempts: 0 } satisfies ClientProgress,
  }
}

export const useGameProgressStore = create<GameProgressState>()(
  persist(
    (set, get) => ({
      ...freshLevelState(1),
      totalStars: 0,
      status: "playing",
      lastMessage: null,

      markBookOpened: () => set({ bookOpenedThisLevel: true }),

      dismissMessage: () => set({ lastMessage: null }),

      registerBrewAttempt: (tier) => {
        const state = get()
        const level = getLevel(state.levelId)

        // --- errou: perde vida; sem vidas, volta pro nível 1 (regra do doc) ---
        if (tier === "failure") {
          const remainingLives = state.lives - 1

          if (remainingLives <= 0) {
            set({
              ...freshLevelState(1),
              status: "gameOver",
              lastMessage:
                "Você perdeu todas as vidas e voltou para o nível 1.",
            })
            return
          }

          set({
            lives: remainingLives,
            client: { ...state.client, attempts: state.client.attempts + 1 },
          })
          return
        }

        // --- acertou (total ou parcial): ganha estrelas e passa pro próximo cliente ---
        const earnedStars = tier === "success" ? 50 : 25
        const stars = state.stars + earnedStars
        const totalStars = state.totalStars + earnedStars
        const nextClientIndex =
          (state.client.clientIndex + 1) % level.clientIds.length

        // --- bateu a meta de estrelas do nível: sobe de nível (ou vence o jogo) ---
        if (stars >= level.starsRequired) {
          const bookBonus = state.bookOpenedThisLevel ? 0 : 10
          const totalWithBonus = totalStars + bookBonus

          if (isLastLevel(level.id)) {
            set({
              stars: stars + bookBonus,
              totalStars: totalWithBonus,
              status: "victory",
              lastMessage: `Fim de jogo! Você completou todos os níveis${
                bookBonus ? ` (+${bookBonus} de bônus por não abrir o livro)` : ""
              }. Placar final: ${totalWithBonus}★.`,
            })
            return
          }

          const nextLevelId = level.id + 1

          set({
            ...freshLevelState(nextLevelId),
            totalStars: totalWithBonus,
            status: "playing",
            lastMessage: `Nível ${level.id} completo!${
              bookBonus ? ` +${bookBonus} de bônus por não abrir o livro.` : ""
            } Indo para o nível ${nextLevelId}.`,
          })
          return
        }

        set({
          stars,
          totalStars,
          client: { clientIndex: nextClientIndex, attempts: 0 },
        })
      },

      resetGame: () =>
        set({
          ...freshLevelState(1),
          totalStars: 0,
          status: "playing",
          lastMessage: null,
        }),
    }),
    {
      name: "verde-remedio-progress",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)
