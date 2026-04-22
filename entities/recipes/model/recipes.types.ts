import { Potion, Client, Ingredient } from "@/entities"

export type Recipe = {
  id: string
  // TODO: VERIFICAR SE SERIA BOM REMETER A UM ENUM E DEPOIS COMPARAR OU JÁ JOGAR PARA A POÇAO EM SI
  result: Potion
  // TODO: ADICIONAR INSTRUMENTOS
  ingredients: Ingredient[]
  description: string
  properties: string[]
  preparation: string
  
  references?: string[]
  clients?: Client[]
  scientificName?: string
}
