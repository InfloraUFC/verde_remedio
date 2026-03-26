import type { Meta, StoryObj } from "@storybook/nextjs"
import { Card } from "./card"

const meta: Meta<typeof Card> = {
  title: "UI/Card",
  component: Card,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Card>

export const Default: Story = {
  args: {
    children: "Card"
  }
}
