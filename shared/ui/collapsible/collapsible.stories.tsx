import type { Meta, StoryObj } from "@storybook/nextjs"
import { Collapsible } from "./collapsible"

const meta: Meta<typeof Collapsible> = {
  title: "UI/Collapsible",
  component: Collapsible,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Collapsible>

export const Default: Story = {
  args: {
    children: "Collapsible"
  }
}
