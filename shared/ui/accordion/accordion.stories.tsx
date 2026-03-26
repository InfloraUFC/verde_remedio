import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./accordion";

const meta: Meta<typeof Accordion> = {
  title: "UI/Accordion",
  component: Accordion,
  parameters: {
    layout: "centered",
  },
  argTypes: {
    type: {
      control: { type: "select" },
      options: ["single", "multiple"],
    },
    collapsible: {
      control: { type: "boolean" },
    },
  },
};

export default meta;

type Story = StoryObj<typeof Accordion>;

export const AccordionSimple: Story = {
  args: {
    type: "single",
    collapsible: true,
  },
  render: (args) => (
    <Accordion {...args} className="w-100">
      <AccordionItem value="item-1">
        <AccordionTrigger>O que é o Accordion?</AccordionTrigger>
        <AccordionContent>
          O Accordion é um componente que permite expandir e colapsar seções
          de conteúdo.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Como ele funciona?</AccordionTrigger>
        <AccordionContent>
          Cada item possui um trigger que controla a visibilidade do conteúdo
          associado.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-3">
        <AccordionTrigger>Quando usar?</AccordionTrigger>
        <AccordionContent>
          Use quando precisar organizar conteúdos em seções compactas.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};

export const AccordionMultiple: Story = {
  args: {
    type: "multiple",
  },
  render: (args) => (
    <Accordion {...args} className="w-100">
      <AccordionItem value="item-1">
        <AccordionTrigger>Item 1</AccordionTrigger>
        <AccordionContent>
          Conteúdo do primeiro item.
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="item-2">
        <AccordionTrigger>Item 2</AccordionTrigger>
        <AccordionContent>
          Conteúdo do segundo item.
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  ),
};