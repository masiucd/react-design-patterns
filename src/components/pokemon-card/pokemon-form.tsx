import React from "react"
import { CombinedError } from "urql"
import { Button } from "../styled/button"
import { Input, Label } from "../styled/form-elements"
import { css, cx } from "@emotion/css"

interface PokemonFormProps {
  error: CombinedError | undefined
  fetching: boolean
  pokemon: string
  setPokemon: React.Dispatch<React.SetStateAction<string>>
}

const formStyles = css`
  display: flex;
  justify-content: center;
  align-items: center;
  label,
  button {
    height: 3rem;
  }

  label {
    display: inline;
    margin-bottom: 0;
    flex: 2 1 70%;
  }
  input {
    height: 100%;
    width: 100%;
    border-radius: 4px 0 0 4px;
    &:focus {
      width: 99%;
      border: 2px solid var(--green);
    }
  }
  button {
    display: inline-block;
    border-radius: 0 4px 4px 0;
    flex: 1 0 30%;
    margin: 0.5rem auto;
  }
`

const PokemonForm: React.FC<PokemonFormProps> = ({ error, fetching, pokemon, setPokemon }) => {
  return (
    <form
      className={cx(formStyles)}
      onSubmit={event => {
        event.preventDefault()

        console.log("fetching", fetching)
      }}
    >
      <Label htmlFor="pokemon">
        <Input
          name="pokemon"
          id="pokemon"
          value={pokemon}
          onChange={event => setPokemon(event.target.value)}
        />
      </Label>
      <Button type="submit">submit</Button>
    </form>
  )
}
export default PokemonForm
