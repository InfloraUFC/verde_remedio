"use client"

import React from "react"
import {
  ExternalFormScreen,
  useGameProgressStore,
  useHydrateGameProgress,
} from "@/features"
import { StartScreen } from "@/widgets/start-screen"
import { CreditsScreen } from "@/widgets/credits-screen"
import { PotionLab } from "@/widgets/potion-lab"

// TODO: trocar pelos links reais do Google Forms quando estiverem prontos.
const PRE_GAME_FORM_URL = "https://forms.gle/SEU-LINK-AQUI-FORMULARIO-INICIAL"
const POST_GAME_FORM_URL = "https://forms.gle/SEU-LINK-AQUI-AUTOAVALIACAO"

type Screen = "start" | "pre-form" | "credits" | "game"

export function AppShell() {
  const hydrated = useHydrateGameProgress()

  const [screen, setScreen] = React.useState<Screen>("start")
  const [cameFromGame, setCameFromGame] = React.useState(false)

  const status = useGameProgressStore((s) => s.status)
  const levelId = useGameProgressStore((s) => s.levelId)
  const totalStars = useGameProgressStore((s) => s.totalStars)
  const resetGame = useGameProgressStore((s) => s.resetGame)

  const canContinue = hydrated && (levelId > 1 || totalStars > 0)

  function handleNewGame() {
    resetGame()
    setScreen("pre-form")
  }

  function handleContinue() {
    setScreen("game")
  }

  function handleShowCredits() {
    setCameFromGame(screen === "game")
    setScreen("credits")
  }

  function handleBackFromCredits() {
    setScreen(cameFromGame ? "game" : "start")
  }

  function handlePlayAgain() {
    resetGame()
    setScreen("start")
  }

  if (!hydrated) {
    return <div className="bg-brick-frame min-h-dvh" />
  }

  if (screen === "start") {
    return (
      <StartScreen
        canContinue={canContinue}
        onNewGame={handleNewGame}
        onContinue={handleContinue}
        onShowCredits={handleShowCredits}
      />
    )
  }

  if (screen === "pre-form") {
    return (
      <ExternalFormScreen
        title="Antes de iniciar o jogo, por favor, responda esse formulário"
        description="Leva menos de 5 minutos!"
        formUrl={PRE_GAME_FORM_URL}
        continueLabel="Continuar para o jogo"
        onContinue={() => setScreen("game")}
      />
    )
  }

  if (screen === "credits") {
    return <CreditsScreen onBack={handleBackFromCredits} />
  }

  // screen === "game"
  if (status === "victory") {
    return (
      <ExternalFormScreen
        title="Parabéns! Você chegou ao nível máximo!"
        description={`Placar final: ${totalStars}★. Agradecemos por jogar — por favor, preencha esse formulário de autoavaliação.`}
        formUrl={POST_GAME_FORM_URL}
        continueLabel="Jogar novamente"
        onContinue={handlePlayAgain}
      />
    )
  }

  return <PotionLab onShowCredits={handleShowCredits} />
}
