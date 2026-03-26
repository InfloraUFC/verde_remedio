import type { Meta, StoryObj } from "@storybook/nextjs"
import {
  Avatar,
  AvatarImage,
  AvatarFallback,
  AvatarBadge,
  AvatarGroup,
  AvatarGroupCount
} from "./avatar"

const meta: Meta<typeof Avatar> = {
  title: "UI/Avatar",
  component: Avatar,
  parameters: {
    layout: "centered",
  },
}

export default meta

type Story = StoryObj<typeof Avatar>

export const Default: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
      <AvatarFallback>GN</AvatarFallback>
    </Avatar>
  ),
}

export const WithFallback: Story = {
  render: () => (
    <Avatar>
      <AvatarFallback>GN</AvatarFallback>
    </Avatar>
  ),
}

export const WithBadge: Story = {
  render: () => (
    <Avatar>
      <AvatarImage src="https://i.pravatar.cc/300" alt="User" />
      <AvatarFallback>GN</AvatarFallback>
      <AvatarBadge />
    </Avatar>
  ),
}

export const Sizes: Story = {
  render: () => (
    <div style={{ display: "flex", gap: "12px", alignItems: "center" }}>
      <Avatar size="sm">
        <AvatarImage src="https://i.pravatar.cc/300" />
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>

      <Avatar size="default">
        <AvatarImage src="https://i.pravatar.cc/300" />
        <AvatarFallback>DF</AvatarFallback>
      </Avatar>

      <Avatar size="lg">
        <AvatarImage src="https://i.pravatar.cc/300" />
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
    </div>
  ),
}

export const Group: Story = {
  render: () => (
    <AvatarGroup>
      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300?img=1" />
        <AvatarFallback>A</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300?img=2" />
        <AvatarFallback>B</AvatarFallback>
      </Avatar>

      <Avatar>
        <AvatarImage src="https://i.pravatar.cc/300?img=3" />
        <AvatarFallback>C</AvatarFallback>
      </Avatar>

      <AvatarGroupCount>
        +3
      </AvatarGroupCount>
    </AvatarGroup>
  ),
}