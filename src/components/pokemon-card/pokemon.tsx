import React from "react"
import { PokemonType } from "../../utils/types"
import styled from "@emotion/styled"
import { css, cx } from "@emotion/css"
import PokemonBody from "./pokemon-body"

interface PokemonProps {
  pokemon: PokemonType | null
}

const PokemonStyles = styled.div`
  border: 2px solid var(--black);
  max-width: 25rem;
  margin: 2rem auto;
  box-shadow: var(--shadowXl);
  border-radius: var(--border-radius);

  .pokemon-name {
    font-size: 2rem;
    text-align: center;
    margin-bottom: 0.5rem;
    span {
      color: var(--green);
      text-shadow: 1px 2px var(--black);
    }
  }
`

const imageStyles = css`
  box-shadow: var(--shadowXl);
  img {
    width: 100%;
    object-fit: scale-down;
  }
`

const Pokemon: React.FC<PokemonProps> = ({ pokemon }) => {
  return (
    pokemon && (
      <PokemonStyles>
        <div className={cx(imageStyles, "img-wrapper")}>
          <img src={pokemon.image} alt={`${pokemon.name}-img`} />
        </div>
        <p className="pokemon-name">
          pokemon <span>{pokemon.name}</span>
        </p>

        <PokemonBody pokemon={pokemon} />
      </PokemonStyles>
    )
  )
}
export default Pokemon
