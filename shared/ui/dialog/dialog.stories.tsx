import type { Meta, StoryObj } from "@storybook/nextjs"
import { Dialog } from "./dialog"

const meta: Meta<typeof Dialog> = {
  title: "UI/Dialog",
  component: Dialog,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Dialog>

export const Default: Story = {
  args: {
    children: "Dialog"
  }
}
