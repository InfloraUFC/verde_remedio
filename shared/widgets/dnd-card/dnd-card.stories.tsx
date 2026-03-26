import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"

import { DndProvider } from "@/shared/widgets/dnd-context/dnd-context"
import { DndCardList } from "@/shared/widgets/dnd-list/dnd-list"
import { DndOverlay } from "@/shared/widgets/dnd-overlay/dnd-overlay"
import { useDndHandlers } from "@/shared/widgets/dnd-context/useDndHandlers"

import { SortableCard } from "./dnd-card"

const meta = {
  title: "Widgets/DnD/Dnd-Card",
  component: SortableCard
} satisfies Meta<typeof SortableCard>

export default meta

type Story = StoryObj<typeof meta>

type Item = {
  id: string
  content: string
}

function SortableCardExample() {
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

export const Default: Story = {
  args: {
    id: "1",
    children: "Card"
  },
  render: () => <SortableCardExample />
}