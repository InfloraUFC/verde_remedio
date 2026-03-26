import type { Meta, StoryObj } from "@storybook/nextjs"
import { Drawer } from "./drawer"

const meta: Meta<typeof Drawer> = {
  title: "UI/Drawer",
  component: Drawer,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Drawer>

export const Default: Story = {
  args: {
    children: "Drawer"
  }
}
