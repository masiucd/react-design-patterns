import { css, cx } from "@emotion/css"
import { useState, Suspense, lazy } from "react"
import { useQuery } from "urql"
import { PokemonType } from "../../utils/types"
import ErrorBoundary from "../common/error-boundry"
import PokemonForm from "./pokemon-form"
import { PokemonOptions } from "./pokemon-options-button"
const Pokemon = lazy(() => import("./pokemon"))

const pokemonCardStyles = css`
  margin: 0 auto;
  padding: 1em;
`

const graphql = String.raw

const pokemonQuery = graphql`
  query($pokemon: String!) {
    pokemon(name: $pokemon) {
      id
      name
      image
      weight {
        minimum
        maximum
      }
      classification
      maxHP
      maxCP
      types
      resistant
      weaknesses
    }
  }
`

export const PokemonCard = () => {
  const [pokemon, setPokemon] = useState("")

  const [{ data, fetching, error }, reexecuteQuery] = useQuery<{ pokemon: PokemonType }>({
    query: pokemonQuery,
    variables: { pokemon: pokemon },
    pause: !pokemon,
  })

  return (
    <div className={cx(pokemonCardStyles)}>
      <PokemonForm setPokemon={setPokemon} pokemon={pokemon} error={error} fetching={fetching} />

      <PokemonOptions setPokemon={setPokemon} />
      <ErrorBoundary>
        <Suspense fallback={<div>...Loading...</div>}>
          <Pokemon pokemon={data ? data.pokemon : null} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
