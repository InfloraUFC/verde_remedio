import type { Meta, StoryObj } from '@storybook/nextjs'
import { useState } from 'react'
import { DndOverlay } from './dnd-overlay'

const meta: Meta<typeof DndOverlay> = {
  title: 'Widgets/DnD/DndOverlay',
  component: DndOverlay,
  tags: ['autodocs'],
  argTypes: {
    activeItem: {
      description: 'O item que está sendo arrastado (ou undefined se nenhum ativo)',
      control: 'text',
    },
    render: {
      description: 'Função que recebe o item ativo e retorna o JSX a ser renderizado',
      table: {
        type: { summary: '(item: string) => React.ReactNode' },
      },
    },
  },
}

export default meta
type Story = StoryObj<typeof DndOverlay>

export const Default: Story = {
  render: () => {
    const [activeItem] = useState<string | undefined>('Item 1')
    return (
      <div className="relative min-h-40 w-40 border border-gray-300 flex items-center justify-center">
        <DndOverlay
          activeItem={activeItem}
          render={(item) => (
            <div className="p-4 bg-white rounded shadow">{item}</div>
          )}
        />
      </div>
    )
  },
}