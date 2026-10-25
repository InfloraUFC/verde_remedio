"use client"

import React from "react"
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  KeyboardSensor,
  MouseSensor,
  TouchSensor,
  useSensor,
  useSensors,
} from "@dnd-kit/core"
import {
  BookDialog,
  BrewButton,
  BrewResult,
  Cauldron,
  Hearts,
  IngredientList,
  LevelBar,
  SoundToggle,
  TutorialButton,
  TutorialDialog,
  useCauldronStore,
  useGameProgressStore,
  useHydrateGameProgress,
} from "@/features"
import {
  Ingredient,
  IngredientCard,
  Instrument,
  InstrumentCard,
  INGREDIENT_KINDS,
  INGREDIENTS,
  INSTRUMENTS_BY_KEYS,
} from "@/entities"
import { getLevel, getUnlockedInstrumentKeys, getUnlockedPlantKeys } from "@/entities/level"
import { PlantShelf } from "./plant-shelf"
import { BaseIngredientShelf } from "./base-ingredient-shelf"
import { InstrumentShelf } from "./instrument-shelf"
import { ClientScene } from "./client-scene"

const ALL_PLANTS = INGREDIENTS.filter((i) => i.kind === INGREDIENT_KINDS.PLANT)
const BASES = INGREDIENTS.filter((i) => i.kind !== INGREDIENT_KINDS.PLANT)

type DragData =
  | { kind: "ingredient"; ingredient: Ingredient }
  | { kind: "instrument"; instrument: Instrument }

type Props = {
  onShowCredits?: () => void
}

export function PotionLab({ onShowCredits }: Props = {}) {
  const hydrated = useHydrateGameProgress()

  const addIngredient = useCauldronStore((s) => s.addIngredient)
  const setInstrument = useCauldronStore((s) => s.setInstrument)

  const levelId = useGameProgressStore((s) => s.levelId)

  const [activeDrag, setActiveDrag] = React.useState<DragData | null>(null)

  // Sensores separados por tipo de entrada:
  //  - mouse: só começa a arrastar após mover 6px (assim o duplo clique funciona);
  //  - toque: arrasta com long-press (180ms), então rolar as prateleiras com o
  //    dedo continua funcionando (antes o toque era sempre capturado pelo item).
  const sensors = useSensors(
    useSensor(MouseSensor, { activationConstraint: { distance: 6 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 180, tolerance: 8 } }),
    useSensor(KeyboardSensor)
  )

  const level = getLevel(levelId)
  const unlockedPlantKeys = new Set(getUnlockedPlantKeys(level))
  const unlockedInstrumentKeys = new Set(getUnlockedInstrumentKeys(level))

  const plants = ALL_PLANTS.filter((p) => unlockedPlantKeys.has(p.key))
  const instruments = INSTRUMENTS_BY_KEYS.filter((i) =>
    unlockedInstrumentKeys.has(i.key)
  )

  function handleDragStart(event: DragStartEvent) {
    setActiveDrag(event.active.data.current as DragData)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event

    if (over?.id === "cauldron") {
      const data = active.data.current as DragData

      if (data.kind === "ingredient") addIngredient(data.ingredient)
      if (data.kind === "instrument") setInstrument(data.instrument)
    }

    setActiveDrag(null)
  }

  // evita piscar/renderizar estado desatualizado antes da reidratação do localStorage
  if (!hydrated) {
    return <div className="bg-parchment min-h-dvh" />
  }

  return (
    <DndContext
      sensors={sensors}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
    >
      <div className="bg-parchment flex min-h-dvh flex-col gap-3 p-4">
        <header className="flex flex-wrap items-center justify-between gap-3">
          <h1 className="font-serif text-xl font-bold text-brand-brown">
            Verde Remédio
          </h1>

          <div className="flex items-center gap-4">
            <LevelBar />
            <Hearts />
          </div>

          <div className="flex items-center gap-2">
            <TutorialButton />
            {onShowCredits && (
              <button
                onClick={onShowCredits}
                title="Ver créditos"
                className="text-xs font-medium text-amber-900/60 underline underline-offset-2 hover:text-amber-900"
              >
                Créditos
              </button>
            )}
            <SoundToggle />
          </div>
        </header>

        <div className="grid flex-1 grid-cols-[15rem_1fr_15rem] gap-4">
          {/* Coluna esquerda: plantas em cima, bases (água/óleo/álcool) embaixo */}
          <div className="flex min-h-0 flex-col gap-3">
            <PlantShelf plants={plants} />
            <BaseIngredientShelf bases={BASES} />
          </div>

          {/* Centro: cliente + caldeirão e itens no rodapé */}
          <div className="flex min-w-0 flex-col justify-end gap-4 pb-2">
            <ClientScene />

            <div className="flex flex-col items-center gap-4">
              {/* O livro fica ao lado do caldeirão (coluna da direita do grid,
                  o caldeirão fica centralizado pela coluna `1fr` vazia). */}
              <div className="grid w-full grid-cols-[1fr_auto_1fr] items-center">
                <div />
                <Cauldron />
                <div className="flex justify-start pl-6 sm:pl-10">
                  <BookDialog />
                </div>
              </div>
              <IngredientList />
              <BrewButton />
              <BrewResult />
            </div>
          </div>

          {/* Coluna direita: utensílios, arrastáveis para o caldeirão */}
          <InstrumentShelf instruments={instruments} />
        </div>
      </div>

      <TutorialDialog />

      <DragOverlay>
        {activeDrag?.kind === "ingredient" && (
          <IngredientCard
            ingredient={activeDrag.ingredient}
            className="scale-110 rounded-lg bg-white/90 shadow-xl"
            labelClassName="text-amber-950"
          />
        )}
        {activeDrag?.kind === "instrument" && (
          <InstrumentCard
            instrument={activeDrag.instrument}
            className="scale-110 rounded-lg bg-white/90 shadow-xl"
            labelClassName="text-amber-950"
          />
        )}
      </DragOverlay>
    </DndContext>
  )
}
