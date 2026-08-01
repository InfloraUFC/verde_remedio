"use client"

import React from "react"
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { BookDialog, BrewButton, BrewResult, Cauldron, IngredientList, useCauldronStore } from "@/features"
import {
  Ingredient,
  IngredientCard,
  Instrument,
  InstrumentCard,
  INGREDIENT_KINDS,
  INGREDIENTS,
  INSTRUMENTS_BY_KEYS,
} from "@/entities"
import { PlantShelf } from "./plant-shelf"
import { BaseIngredientShelf } from "./base-ingredient-shelf"
import { InstrumentShelf } from "./instrument-shelf"

const PLANTS = INGREDIENTS.filter((i) => i.kind === INGREDIENT_KINDS.PLANT)
const BASES = INGREDIENTS.filter((i) => i.kind !== INGREDIENT_KINDS.PLANT)

type DragData =
  | { kind: "ingredient"; ingredient: Ingredient }
  | { kind: "instrument"; instrument: Instrument }

export function PotionLab() {
  const addIngredient = useCauldronStore((s) => s.addIngredient)
  const setInstrument = useCauldronStore((s) => s.setInstrument)

  const [activeDrag, setActiveDrag] = React.useState<DragData | null>(null)

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

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="bg-parchment flex min-h-dvh flex-col gap-4 p-4">
        <header className="flex items-center justify-between">
          <h1 className="font-serif text-lg font-semibold text-amber-950">
            Verde Remédio
          </h1>
          <BookDialog />
        </header>

        <div className="grid flex-1 grid-cols-[15rem_1fr_15rem] gap-4">
          {/* Coluna esquerda: plantas em cima, bases (água/óleo/álcool) embaixo */}
          <div className="flex min-h-0 flex-col gap-3">
            <PlantShelf plants={PLANTS} />
            <BaseIngredientShelf bases={BASES} />
          </div>

          {/* Centro: cena (reservada) + caldeirão e itens no rodapé */}
          <div className="flex min-w-0 flex-col justify-end gap-4 pb-2">
            <div className="flex flex-1 items-center justify-center rounded-xl border-2 border-dashed border-amber-900/15 text-xs text-amber-900/40">
              Cena do cliente (em breve)
            </div>

            <div className="flex flex-col items-center gap-4">
              <Cauldron />
              <IngredientList />
              <BrewButton />
              <BrewResult />
            </div>
          </div>

          {/* Coluna direita: instrumentos, arrastáveis para o caldeirão */}
          <InstrumentShelf instruments={INSTRUMENTS_BY_KEYS} />
        </div>
      </div>

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
