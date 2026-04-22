import { Client } from "./client.types"

export const CLIENTS: Client[] = [
  {
    id: "1",
    name: "Luciana Silva Pereira",
    age: 67,
    description:
      "Dona de casa, amigável, inteligente, mas teimosa. Gosta de pássaros, crochê e dança.",
    conditions: [
      {
        name: "Artrite",
        description: "Desgaste das articulações (osteoartrite)",
        symptoms: ["dor nas articulações"],
      },
    ],
    preferences: ["chás", "remédios caseiros"],
  },
  {
    id: "2",
    name: "Luiz Bernardo Rufino",
    age: 47,
    description:
      "Artista viajante, gentil, apaixonado por gatos, com fobia de minhocas.",
    conditions: [
      {
        name: "Bronquite crônica",
        description: "Decorrente de anos de tabagismo",
      },
    ],
    preferences: ["arte", "gatos"],
  },
  {
    id: "3",
    name: "Amanda Estéfane da Cunha Silveira",
    age: 17,
    description:
      "Estudante, ansiosa com vestibular, não gosta de ciências naturais.",
    conditions: [
      {
        name: "Gastrite",
        description: "Relacionada à má alimentação e estresse",
        symptoms: ["queimação no estômago", "azia"],
      },
    ],
    preferences: [
      "fast food",
      "refrigerante",
      "doces",
    ],
  },
]