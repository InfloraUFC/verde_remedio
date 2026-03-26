import type { Meta, StoryObj } from "@storybook/nextjs"
import { Breadcrumb } from "./breadcrumb"

const meta: Meta<typeof Breadcrumb> = {
  title: "UI/Breadcrumb",
  component: Breadcrumb,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Breadcrumb>

export const Default: Story = {
  args: {
    children: "Breadcrumb"
  }
}
