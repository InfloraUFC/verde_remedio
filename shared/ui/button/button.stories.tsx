import type { Meta, StoryObj } from "@storybook/nextjs";
import { Button, type SizeButtonOptionsType, type VariantButtonOptionsType } from "./button";

const SIZE_OPTIONS: SizeButtonOptionsType[] = ["default", "xs", "sm", "lg", "icon", "icon-xs", "icon-sm", "icon-lg"]

const VARIANT_OPTIONS: VariantButtonOptionsType[] = ["default", "outline", "secondary", "ghost", "destructive", "link"]

const meta: Meta<typeof Button> = {
  title: "UI/Button",
  component: Button,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    variant: {
      control: { type: "select" },
      options: VARIANT_OPTIONS,
    },
    size: {
      control: { type: "select" },
      options: SIZE_OPTIONS,
    },
    asChild: { control: false },
  },
};

export default meta;
type Story = StoryObj<typeof Button>;

export const ButtonPlayground: Story = {
  args: {
    children: "Button",
    variant: "default",
    size: "default",
    asChild: false,
  },
};