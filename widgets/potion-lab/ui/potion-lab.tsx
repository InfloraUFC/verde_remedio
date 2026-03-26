"use client"

import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core"
import { BookDialog, Cauldron, useCauldronStore } from "@/features"
import { Ingredient, INGREDIENTS } from "@/entities"
import { IngredientSidebar } from "./ingredient-sidebar"
import React from "react"

export function PotionLab() {
  const addIngredient = useCauldronStore((s) => s.addIngredient)

  const [activeIngredient, setActiveIngredient] = React.useState<Ingredient | null>(null)

  function handleDragStart(event: DragStartEvent) {
    const ingredient = event.active.data.current as Ingredient
    setActiveIngredient(ingredient)
  }

  function handleDragEnd(event: DragEndEvent) {
    const { over, active } = event

    if (over?.id === "cauldron") {
      const ingredient = active.data.current as Ingredient
      addIngredient(ingredient)
    }

    setActiveIngredient(null)
  }

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="flex gap-10 p-6">

        <IngredientSidebar ingredients={INGREDIENTS} />

        <DragOverlay>
          {activeIngredient ? (
            <div className="px-3 py-2 border rounded bg-white shadow-lg">
              {activeIngredient.name}
            </div>
          ) : null}
        </DragOverlay>

        <div className="flex-1 flex items-center justify-center">
          <Cauldron />
        </div>
        
        <BookDialog />
      </div>
    </DndContext>
  )
}