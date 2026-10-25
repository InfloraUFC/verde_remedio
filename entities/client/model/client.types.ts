import type { TreatmentForType } from "@/entities/recipes/model/recipes.types"

export type HealthCondition = {
  name: string
  description?: string
  symptoms?: string[]
  treatmentFor: TreatmentForType
}

export type ClientDialogue = {
  greeting: string[]
  success: string[]
  partial: string[]
  failure: string[]
  /**
   * Fala quando o jogador tenta preparar a MESMA receita pela 3ª vez.
   * `{recipe}` é substituído pelo nome da poção.
   */
  repeated: string[]
}

export type Client = {
  id: string
  name: string
  age: number
  description: string
  conditions: HealthCondition[]
  preferences?: string[]

  /** Caminho pra arte do personagem (ainda não existe, ver public/images/clients). */
  portrait?: string

  dialogue: ClientDialogue
}
