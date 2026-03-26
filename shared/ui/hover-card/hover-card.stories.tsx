import type { Meta, StoryObj } from "@storybook/nextjs"
import { HoverCard } from "./hover-card"

const meta: Meta<typeof HoverCard> = {
  title: "UI/HoverCard",
  component: HoverCard,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof HoverCard>

export const Default: Story = {
  args: {
    children: "HoverCard"
  }
}
