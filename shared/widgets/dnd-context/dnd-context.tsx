"use client"

import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors
} from "@dnd-kit/core"

import {
  OnDragStartType,
  OnDragMoveType,
  OnDragOverType,
  OnDragEndType,
  OnDragCancelType
} from "./types"

type Props = {
  children: React.ReactNode
  onDragStart?: OnDragStartType
  onDragMove?: OnDragMoveType
  onDragOver?: OnDragOverType
  onDragEnd?: OnDragEndType
  onDragCancel?: OnDragCancelType
}

export function DndProvider({
  children,
  onDragStart,
  onDragMove,
  onDragOver,
  onDragEnd,
  onDragCancel
}: Props) {

  const sensors = useSensors(
    useSensor(PointerSensor)
  )

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={closestCenter}
      onDragStart={onDragStart}
      onDragMove={onDragMove}
      onDragOver={onDragOver}
      onDragEnd={onDragEnd}
      onDragCancel={onDragCancel}
    >
      {children}
    </DndContext>
  )
}