"use client"

import { useState } from "react"

import { DndProvider } from "@/shared/widgets/dnd-context/dnd-context"
import { DndCardList } from "@/shared/widgets/dnd-list/dnd-list"
import { DndOverlay } from "@/shared/widgets/dnd-overlay/dnd-overlay"
import { useDndHandlers } from "@/shared/widgets/dnd-context/useDndHandlers"

type Item = {
  id: string
  content: string
}

export default function Home() {
  const [items, setItems] = useState<Item[]>([
    { id: "1", content: "Card 1" },
    { id: "2", content: "Card 2" },
    { id: "3", content: "Card 3" }
  ])

  const { activeId, onDragStart, onDragEnd } = useDndHandlers(items, setItems)

  const activeItem = items.find(i => i.id === activeId)

  return (
    <DndProvider
      onDragStart={onDragStart}
      onDragEnd={onDragEnd}
    >
      <DndCardList items={items} />

      <DndOverlay
        activeItem={activeItem}
        render={(item) => (
          <div className="p-4 border rounded-md bg-white">
            {item.content}
          </div>
        )}
      />
    </DndProvider>
  )
}