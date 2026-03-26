import type { Meta, StoryObj } from "@storybook/nextjs"
import { AspectRatio } from "./aspect-ratio"
import Image from "next/image"

const meta: Meta<typeof AspectRatio> = {
  title: "UI/AspectRatio",
  component: AspectRatio,
  parameters: {
    layout: "centered",
  },
}

export default meta
type Story = StoryObj<typeof AspectRatio>

export const Default: Story = {
  args: {
    ratio: 16 / 9,
    children: (
      <div className="relative w-100">
        <AspectRatio ratio={16 / 9}>
          <Image
            src="https://placehold.co/600x400"
            alt="Example"
            fill
            className="object-cover rounded-md"
          />
        </AspectRatio>
      </div>
    ),
  },
}

export const Square: Story = {
  args: {
    ratio: 1,
    children: (
      <div className="relative w-100">
        <AspectRatio ratio={1}>
          <Image
            src="https://placehold.co/400x400"
            alt="Example"
            fill
            className="object-cover rounded-md"
          />
        </AspectRatio>
      </div>
    ),
  },
}