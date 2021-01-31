import { css, cx } from "@emotion/css"
import { Reducer, useReducer } from "react"
import { Link } from "react-router-dom"
import { checkWinner } from "../../utils/check-winner"
import Fade from "../elements/fade"
import GameMessage from "./game-message"
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

const gameStyles = css`
  position: relative;
`

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
    if (winner || squares[square]) {
      return
    }
    squares[square] = isX ? "X" : "O"
    dispatch({ type: "SET_X" })
  }

  const newGame = () => {
    dispatch({ type: "NEW_GAME" })
  }

  return (
    <div className={cx(gameStyles)}>
      <GameMessage isWinner={Boolean(winner)} winner={winner} newGame={newGame} />
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
    </div>
  )
}

export default GameWithReducer
