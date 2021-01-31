export interface PokemonType {
  id: string
  name: string
  image: string
  weight: {
    minimum: number
    maximum: number
  }
  classification: string
  maxHP: number
  maxCP: number
  types: string[]
  resistant: string[]
  weaknesses: string[]
}
