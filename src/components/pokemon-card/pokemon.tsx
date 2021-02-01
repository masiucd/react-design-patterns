import React from "react"
import { PokemonType } from "../../utils/types"
import styled from "@emotion/styled"
import { css, cx } from "@emotion/css"

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

const Body = styled.div`
  display: flex;
  flex-flow: column wrap;
  & > p,
  ul {
    margin-bottom: 0.5rem;
    font-size: 0.9rem;
  }

  .weight {
    grid-column: 1/3;
  }
  .types {
    grid-column: 3/5;
  }
  .life {
    grid-column: 1/-1;
    display: flex;
    flex-flow: row wrap;
    justify-content: space-between;
    padding: 0 2rem;
    p {
      span {
        color: var(--green);
        background-color: var(--black);
      }
    }
  }
  .resistant {
    grid-column: 1/3;
  }
  .weaknesses {
    grid-column: 3/5;
  }

  ul {
    li {
      &:first-child {
        color: var(--green);
        background-color: var(--black);
        margin-bottom: 0.5rem;
      }
      padding: 0.2rem;
    }
  }

  @media (min-width: 375px) {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 25px;
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

        <Body>
          <ul className="weight">
            <li>{pokemon.name}'s weight:</li>

            <li>min:{pokemon.weight?.minimum}</li>
            <li>max:{pokemon.weight?.maximum}</li>
          </ul>

          <ul className="types">
            <li>{pokemon.name} Types</li>
            {pokemon.types?.map((type: string) => (
              <li key={type}>{type}</li>
            ))}
          </ul>

          <div className="life">
            <p className="hp">
              max HP: <span>{pokemon.maxHP}</span>{" "}
            </p>
            <p className="cp">
              max CP: <span>{pokemon.maxCP}</span>{" "}
            </p>
          </div>

          <ul className="resistant">
            <li>resistance</li>
            {pokemon.resistant?.map((r: string) => (
              <li key={r}>{r}</li>
            ))}
          </ul>

          <ul className="weaknesses">
            <li>weakness</li>
            {pokemon.weaknesses?.map((w: string) => (
              <li key={w}>{w}</li>
            ))}
          </ul>
        </Body>
      </PokemonStyles>
    )
  )
}
export default Pokemon
