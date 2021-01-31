import React from "react"
import Title from "../elements/title"
import { PokemonCard } from "../pokemon-card/pokemon-card"

const PokemonPage = () => {
  return (
    <>
      <Title mainTitle="Pokemon" />

      <PokemonCard />
    </>
  )
}
export default PokemonPage
