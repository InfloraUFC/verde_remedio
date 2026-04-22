export type HealthCondition = {
  name: string
  description?: string
  symptoms?: string[]
}

export type Client = {
  id: string
  name: string
  age: number
  description: string
  conditions: HealthCondition[]
  preferences?: string[]
}