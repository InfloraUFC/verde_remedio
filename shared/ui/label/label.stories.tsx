import type { Meta, StoryObj } from "@storybook/nextjs"
import { Label } from "./label"

const meta: Meta<typeof Label> = {
  title: "UI/Label",
  component: Label,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Label>

export const Default: Story = {
  args: {
    children: "Label"
  }
}
