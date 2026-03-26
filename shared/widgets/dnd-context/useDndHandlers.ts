import { useState } from "react"
import { arrayMove } from "@dnd-kit/sortable"
import {
  DragStartEvent,
  DragEndEvent
} from "@dnd-kit/core"

export function useDndHandlers<T extends { id: string }>(
  items: T[],
  setItems: (items: T[]) => void
) {
  const [activeId, setActiveId] = useState<string | null>(null)

  function onDragStart(event: DragStartEvent) {
    setActiveId(event.active.id as string)
  }

  function onDragEnd(event: DragEndEvent) {
    const { active, over } = event;

    setActiveId(null)

    if (!over || active.id === over.id) return

    const oldIndex = items.findIndex(i => i.id === active.id)
    const newIndex = items.findIndex(i => i.id === over.id)

    setItems(arrayMove(items, oldIndex, newIndex))
  }

  return {
    activeId,
    onDragStart,
    onDragEnd
  }
}