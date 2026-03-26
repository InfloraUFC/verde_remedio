"use client"

import {
  SortableContext,
  verticalListSortingStrategy
} from "@dnd-kit/sortable"

import { SortableCard } from "../dnd-card/dnd-card"

type Props = {
  items: { id: string; content: string }[]
}

export function DndCardList({ items }: Props) {
  return (
    <SortableContext
      items={items}
      strategy={verticalListSortingStrategy}
    >
      {items.map((item) => (
        <SortableCard key={item.id} id={item.id}>
          <div className="p-4 border rounded-md bg-white">
            {item.content}
          </div>
        </SortableCard>
      ))}
    </SortableContext>
  )
}