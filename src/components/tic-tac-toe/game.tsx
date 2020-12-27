import { css, cx } from "@emotion/css"
import { useEffect, useState } from "react"
import { checkWinner } from "../../utils/check-winner"
import { Alert } from "./alert"
import Square from "./square"

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

const Game = () => {
  const [squares, setSquares] = useState<Array<string | null>>(Array(9).fill(null))

  const [isX, setIsX] = useState(false)
  const [isWinner, setIsWinner] = useState(false)
  const winner = checkWinner(squares)

  const newGame = () => {
    setSquares(Array(9).fill(null))
    setIsWinner(false)
  }

  const handleClick = (squareIndex: number) => {
    if (winner || squares[squareIndex]) {
      return
    }
    setSquares(prev => {
      const xs = [...prev]
      xs[squareIndex] = isX ? "X" : "O"
      return xs
    })
    // setSquares(prev => [...prev, (squares[squareIndex] = isX ? "X" : "O")])
    setIsX(p => !p)
  }
  useEffect(() => {
    if (winner) {
      setIsWinner(true)
    }
  }, [winner])

  return (
    <>
      <Alert winner={isWinner} winningChar={String(winner)} newGame={newGame} />
      <div className={`game-wrapper ${cx(styles())}`}>
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

export default Game
