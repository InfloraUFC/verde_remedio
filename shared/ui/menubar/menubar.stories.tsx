import type { Meta, StoryObj } from "@storybook/nextjs"
import { Menubar } from "./menubar"

const meta: Meta<typeof Menubar> = {
  title: "UI/Menubar",
  component: Menubar,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Menubar>

export const Default: Story = {
  args: {
    children: "Menubar"
  }
}
