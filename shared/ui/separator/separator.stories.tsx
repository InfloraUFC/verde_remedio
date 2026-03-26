import type { Meta, StoryObj } from "@storybook/nextjs"
import { Separator } from "./separator"

const meta: Meta<typeof Separator> = {
  title: "UI/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Separator>

export const Default: Story = {
  args: {
    children: "Separator"
  }
}
