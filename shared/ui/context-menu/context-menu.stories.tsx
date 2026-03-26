import type { Meta, StoryObj } from "@storybook/nextjs"
import { ContextMenu } from "./context-menu"

const meta: Meta<typeof ContextMenu> = {
  title: "UI/ContextMenu",
  component: ContextMenu,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ContextMenu>

export const Default: Story = {
  args: {
    children: "ContextMenu"
  }
}
