import React from "react"
import { PokemonType } from "../../utils/types"

interface PokemonProps {
  pokemon: PokemonType | null
}

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  return pokemon ? <h1>{pokemon.name}</h1> : null
}
export default Pokemon
