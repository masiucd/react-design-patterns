import React from "react"
import { Button } from "../styled/button"
import { css, cx } from "@emotion/css"

interface Props {
  setPokemon: React.Dispatch<React.SetStateAction<string>>
}

const optionStyles = css`
  display: flex;
  flex-flow: row wrap;
  button {
    width: 12rem;
    transition: var(--main-trans);
    margin: 0.75rem auto;
    &:hover {
      background-color: var(--red);
    }
  }
`

export const PokemonOptions = ({ setPokemon }: Props) => {
  return (
    <div className={cx(optionStyles, "options")}>
      <Button onClick={() => setPokemon("Venusaur")}>Venusaur</Button>
      <Button onClick={() => setPokemon("Bulbasaur")}>Bulbasaur</Button>
      <Button onClick={() => setPokemon("Charmander")}>Charmander</Button>
    </div>
  )
}
