import type { Meta, StoryObj } from '@storybook/nextjs'
import { DndCardList } from './dnd-list'
import { DndProvider, useDndHandlers } from '../dnd-context'
import { DndOverlay } from '../dnd-overlay/dnd-overlay'
import { useState } from 'react'


const meta: Meta<typeof DndCardList> = {
  title: 'Widgets/DnD/DndCardList',
  component: DndCardList,
  argTypes: {
    items: { control: 'object' },
  },
}

export default meta

type Story = StoryObj<typeof DndCardList>

type Item = {
  id: string
  content: string
}

export const Default: Story = {
  args: {
    items: [
      { id: '1', content: 'Card 1' },
      { id: '2', content: 'Card 2' },
      { id: '3', content: 'Card 3' },
    ],
  },
  render: (args) => {
      const [items, setItems] = useState<Item[]>(args.items as Item[])
    
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
}