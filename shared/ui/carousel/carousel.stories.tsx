import type { Meta, StoryObj } from "@storybook/nextjs"
import { Carousel } from "./carousel"

const meta: Meta<typeof Carousel> = {
  title: "UI/Carousel",
  component: Carousel,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Carousel>

export const Default: Story = {
  args: {
    children: "Carousel"
  }
}
