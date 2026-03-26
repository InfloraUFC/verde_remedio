import type { Meta, StoryObj } from "@storybook/nextjs"
import { {{componentName}} } from "./{{fileName}}"

const meta: Meta<typeof {{componentName}}> = {
  title: "UI/{{componentName}}",
  component: {{componentName}},
  tags: ['autodocs'],
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof {{componentName}}>

export const Default: Story = {
  args: {
    children: "{{componentName}}"
  }
}