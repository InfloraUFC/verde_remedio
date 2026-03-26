import type { Meta, StoryObj } from "@storybook/nextjs"
import { Sheet } from "./sheet"

const meta: Meta<typeof Sheet> = {
  title: "UI/Sheet",
  component: Sheet,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Sheet>

export const Default: Story = {
  args: {
    children: "Sheet"
  }
}
