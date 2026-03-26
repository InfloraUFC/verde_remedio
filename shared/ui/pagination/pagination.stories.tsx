import type { Meta, StoryObj } from "@storybook/nextjs"
import { Pagination } from "./pagination"

const meta: Meta<typeof Pagination> = {
  title: "UI/Pagination",
  component: Pagination,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof Pagination>

export const Default: Story = {
  args: {
    children: "Pagination"
  }
}
