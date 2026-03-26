import type { Meta, StoryObj } from "@storybook/nextjs"
import { ChartContainer } from "./chart"
import { BarChart, Bar, XAxis, YAxis } from "recharts"

const meta: Meta<typeof ChartContainer> = {
  title: "UI/Chart",
  component: ChartContainer,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof ChartContainer>

const data = [
  { name: "Jan", value: 400 },
  { name: "Feb", value: 300 },
  { name: "Mar", value: 500 },
]

export const Default: Story = {
  render: () => (
    <ChartContainer
      config={{
        value: {
          label: "Value",
          color: "#2563eb",
        },
      }}
      className="w-[400px] h-[300px]"
    >
      <BarChart data={data}>
        <XAxis dataKey="name" />
        <YAxis />
        <Bar dataKey="value" fill="var(--color-value)" />
      </BarChart>
    </ChartContainer>
  ),
}
