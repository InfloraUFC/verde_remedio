import type { Meta, StoryObj } from "@storybook/nextjs"
import { Select } from "./select"

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Select>

export const Default: Story = {
  args: {
    children: "Select"
  }
}
