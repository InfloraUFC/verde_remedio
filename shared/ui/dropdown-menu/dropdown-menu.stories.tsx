import type { Meta, StoryObj } from "@storybook/nextjs"
import { DropdownMenu } from "./dropdown-menu"

const meta: Meta<typeof DropdownMenu> = {
  title: "UI/DropdownMenu",
  component: DropdownMenu,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof DropdownMenu>

export const Default: Story = {
  args: {
    children: "DropdownMenu"
  }
}
