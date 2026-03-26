import type { Meta, StoryObj } from "@storybook/nextjs"
import { useState } from "react"
import { DndProvider } from "./dnd-context"
import { useDndHandlers } from "./useDndHandlers"
import { DndCardList } from "../dnd-list/dnd-list"
import { DndOverlay } from "../dnd-overlay/dnd-overlay"


const meta = {
  title: "Widgets/DnD/DndProvider",
  component: DndProvider
} satisfies Meta<typeof DndProvider>

export default meta

type Story = StoryObj<typeof meta>

type Item = {
  id: string
  content: string
}

function Example() {
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
    children: "Card"
  },
  render: () => <Example />
}
