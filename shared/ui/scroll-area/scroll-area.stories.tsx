import type { Meta, StoryObj } from "@storybook/nextjs"
import { ScrollArea } from "./scroll-area"

const meta: Meta<typeof ScrollArea> = {
  title: "UI/ScrollArea",
  component: ScrollArea,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ScrollArea>

export const Default: Story = {
  args: {
    children: "ScrollArea"
  }
}
