import { create } from "zustand"
import { persist, createJSONStorage } from "zustand/middleware"

/**
 * Preferência de som. Ainda não existe player/efeitos sonoros no jogo —
 * esse store só guarda a preferência (mudo por padrão) pra já deixar a UI
 * pronta. Quando o áudio for implementado, é só ler `muted` daqui.
 */
type SoundSettingsState = {
  muted: boolean
  toggleMuted: () => void
}

export const useSoundSettingsStore = create<SoundSettingsState>()(
  persist(
    (set) => ({
      muted: true,
      toggleMuted: () => set((s) => ({ muted: !s.muted })),
    }),
    {
      name: "verde-remedio-sound",
      storage: createJSONStorage(() => localStorage),
      skipHydration: true,
    }
  )
)
