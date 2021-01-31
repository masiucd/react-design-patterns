import { css, cx } from "@emotion/css"
import { useState, Suspense, lazy } from "react"
import { useQuery } from "urql"
import ErrorBoundary from "../common/error-boundry"
const Pokemon = lazy(() => import("./pokemon"))

const pokemonCardStyles = css`
  border: 2px solid #333;
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

  const [{ data, fetching, error }, reexecuteQuery] = useQuery({
    query: pokemonQuery,
    variables: { pokemon: pokemon },
    pause: !pokemon,
  })

  // Venusaur
  // Bulbasaur
  // Charmander

  return (
    <div className={cx(pokemonCardStyles)}>
      <form
        onSubmit={event => {
          event.preventDefault()

          console.log(data)
          console.log(error)
          console.log("fetching", fetching)
        }}
      >
        <input name="pokemon" value={pokemon} onChange={event => setPokemon(event.target.value)} />
        <button type="submit">submit</button>
      </form>
      <ErrorBoundary>
        <Suspense fallback={<div>...Loading...</div>}>
          <Pokemon pokemon={data ? data.pokemon : null} />
        </Suspense>
      </ErrorBoundary>
    </div>
  )
}
