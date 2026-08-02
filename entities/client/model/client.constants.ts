import { TREATMENT_CONSTANT } from "@/entities/recipes/model/recipes.types"
import { Client } from "./client.types"

export const CLIENTS: Client[] = [
  {
    id: "1",
    name: "Luciana Silva Pereira",
    age: 67,
    description:
      "Dona de casa, amigável, inteligente, mas teimosa. Gosta de pássaros, crochê e dança.",
    portrait: "/images/clients/luciana.png",
    conditions: [
      {
        name: "Artrite",
        description: "Desgaste das articulações (osteoartrite)",
        symptoms: ["dor nas articulações"],
        treatmentFor: TREATMENT_CONSTANT.ARTHRITIS,
      },
    ],
    preferences: ["chás", "remédios caseiros"],
    dialogue: {
      greeting: [
        "Ai, minhas articulações não me deixam em paz hoje...",
        "Vim atrás de um chazinho, o médico é muito longe daqui.",
      ],
      success: ["Ah, que alívio! Já sinto a dor passando, muito obrigada!"],
      partial: ["Melhorou um pouco, mas ainda tá doendo... tem algo melhor?"],
      failure: ["Isso não fez nada pela minha dor, minha filha."],
    },
  },
  {
    id: "2",
    name: "Luiz Bernardo Rufino",
    age: 47,
    description:
      "Artista viajante, gentil, apaixonado por gatos, com fobia de minhocas.",
    portrait: "/images/clients/luiz.png",
    conditions: [
      {
        name: "Bronquite crônica",
        description: "Decorrente de anos de tabagismo",
        treatmentFor: TREATMENT_CONSTANT.BRONCHITIS,
      },
    ],
    preferences: ["arte", "gatos"],
    dialogue: {
      greeting: [
        "*tosse* Desculpe, esse peito não me dá sossego.",
        "Andei pintando ao ar livre e voltei tossindo sem parar.",
      ],
      success: ["Ufa, já respiro melhor! Você tem talento pra isso."],
      partial: ["Ainda sinto o peito pesado, mas já ajudou um pouco."],
      failure: ["*tosse forte* Isso não resolveu nada..."],
    },
  },
  {
    id: "3",
    name: "Amanda Estéfane da Cunha Silveira",
    age: 17,
    description:
      "Estudante, ansiosa com vestibular, não gosta de ciências naturais.",
    portrait: "/images/clients/amanda.png",
    conditions: [
      {
        name: "Gastrite",
        description: "Relacionada à má alimentação e estresse",
        symptoms: ["queimação no estômago", "azia"],
        treatmentFor: TREATMENT_CONSTANT.GASTRITIS,
      },
    ],
    preferences: ["fast food", "refrigerante", "doces"],
    dialogue: {
      greeting: [
        "Meu estômago tá em chamas de novo, acho que foi o café...",
        "Ai, essa queimação não me deixa estudar direito.",
      ],
      success: ["Nossa, parou de queimar! Obrigada, você me salvou."],
      partial: ["Melhorou um pouquinho, mas ainda sinto a azia."],
      failure: ["Continua queimando igual... isso não funcionou."],
    },
  },
]
