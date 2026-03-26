import type { Meta, StoryObj } from "@storybook/nextjs"
import { Popover } from "./popover"

const meta: Meta<typeof Popover> = {
  title: "UI/Popover",
  component: Popover,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Popover>

export const Default: Story = {
  args: {
    children: "Popover"
  }
}
