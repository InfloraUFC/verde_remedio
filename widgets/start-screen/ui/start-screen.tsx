"use client"

import { Button, ItemImage } from "@/shared/ui"
import { SoundToggle } from "@/features"
import { BookHeart } from "lucide-react"

type Props = {
  canContinue: boolean
  onNewGame: () => void
  onContinue: () => void
  onShowCredits: () => void
}

export function StartScreen({
  canContinue,
  onNewGame,
  onContinue,
  onShowCredits,
}: Props) {
  return (
    <div className="bg-brick-frame flex min-h-dvh flex-col items-center gap-6 p-6">
      <h1 className="max-w-2xl text-center font-serif text-3xl font-extrabold text-emerald-50 drop-shadow-[0_2px_0_rgba(0,0,0,0.35)] sm:text-4xl">
        Verde Remédio: Saberes Tradicionais
      </h1>

      {/* Cena da tela inicial — reservada. Basta colocar a arte em
          /public/images/scenes/start-screen.png que ela aparece aqui,
          substituindo o ícone de fallback. */}
      <ItemImage
        src="/images/scenes/start-screen.png"
        alt="Cena inicial do jogo"
        icon={<BookHeart className="size-16 text-amber-900/40" />}
        className="bg-parchment aspect-video w-full max-w-3xl rounded-xl ring-1 ring-black/10"
      />

      <div className="flex flex-col items-center gap-3">
        <Button size="lg" onClick={onNewGame} className="w-56">
          Novo Jogo
        </Button>

        <Button
          size="lg"
          variant="outline"
          disabled={!canContinue}
          onClick={onContinue}
          title={
            canContinue
              ? "Continuar de onde você parou"
              : "Nenhum jogo salvo ainda"
          }
          className="w-56 bg-amber-50/90"
        >
          Carregar Jogo
        </Button>

        <button
          onClick={onShowCredits}
          className="text-sm font-medium text-emerald-50/90 underline underline-offset-2 hover:text-white"
        >
          Ver créditos
        </button>
      </div>

      <div className="mt-auto">
        <SoundToggle />
      </div>
    </div>
  )
}
