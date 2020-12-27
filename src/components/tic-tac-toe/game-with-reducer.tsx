import { css, cx } from "@emotion/css"
import React, { Reducer, useReducer } from "react"
import { checkWinner } from "../../utils/check-winner"
import { Alert } from "./alert"
import Square from "./square"

interface State {
  squares: string[] | null[]
  isX: boolean
  isWinner: boolean
}

type Action =
  | { type: "SET_SQUARE"; payload: number }
  | { type: "SET_WINNER"; payload: boolean }
  | { type: "SET_X" }
  | { type: "NEW_GAME" }

const gameReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case "SET_SQUARE":
      return {
        ...state,
        // squares: (state.squares[action.payload] = state.isX ? "X" : "O"),
      }

    case "SET_X":
      return {
        ...state,
        isX: !state.isX,
      }
    case "SET_WINNER":
      return {
        ...state,
        isWinner: true,
      }

    case "NEW_GAME":
      return {
        ...state,
        squares: Array(9).fill(null),
        isWinner: false,
      }

    default:
      throw new Error(`Unsupported type`)
  }
}

const styles = () => css`
  box-shadow: 0 0 0 1px var(--textColor);
  min-height: 24rem;
  max-width: 770px;
  margin: 2rem auto;
  display: flex;
  flex-flow: row wrap;

  .square {
    flex: 1 0 30%;
    cursor: pointer;
    box-shadow: var(--shadowXl);
    transition: var(--main-trans);
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 2.75rem;
    height: 8rem;
    &:hover {
      box-shadow: var(--shadow2Xl);
    }
  }
`

const GameWithReducer = () => {
  const [{ squares, isX, isWinner }, dispatch] = useReducer(gameReducer, {
    squares: Array(9).fill(null),
    isX: false,
    isWinner: false,
  })

  const winner = checkWinner(squares)

  const handleClick = (square: number) => {
    squares[square] = isX ? "X" : "O"
    dispatch({ type: "SET_X" })
  }

  return (
    <>
      <Alert
        winner={isWinner}
        winningChar={String(winner)}
        newGame={() => dispatch({ type: "NEW_GAME" })}
      />
      <div className={`game-wrapper-with-reducer ${cx(styles())}`}>
        <Square squares={squares} handleClick={handleClick} index={0} />
        <Square squares={squares} handleClick={handleClick} index={1} />
        <Square squares={squares} handleClick={handleClick} index={2} />
        <Square squares={squares} handleClick={handleClick} index={3} />
        <Square squares={squares} handleClick={handleClick} index={4} />
        <Square squares={squares} handleClick={handleClick} index={5} />
        <Square squares={squares} handleClick={handleClick} index={6} />
        <Square squares={squares} handleClick={handleClick} index={7} />
        <Square squares={squares} handleClick={handleClick} index={8} />
      </div>
    </>
  )
}

export default GameWithReducer
