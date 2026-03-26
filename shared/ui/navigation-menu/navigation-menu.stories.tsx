import type { Meta, StoryObj } from "@storybook/nextjs"
import { NavigationMenu } from "./navigation-menu"

const meta: Meta<typeof NavigationMenu> = {
  title: "UI/NavigationMenu",
  component: NavigationMenu,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof NavigationMenu>

export const Default: Story = {
  args: {
    children: "NavigationMenu"
  }
}
