import type { Meta, StoryObj } from "@storybook/nextjs"
import { Tabs } from "./tabs"

const meta: Meta<typeof Tabs> = {
  title: "UI/Tabs",
  component: Tabs,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Tabs>

export const Default: Story = {
  args: {
    children: "Tabs"
  }
}
