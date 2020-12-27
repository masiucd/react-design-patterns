import { cx, css } from "@emotion/css"

interface SquareProps {
  className?: string
  handleClick: (squareIndex: number) => void
  squares: Array<string | null>
  index: number
}

const Square = ({ index, className, handleClick, squares }: SquareProps) => {
  return (
    <div className={`square ${cx(className)}`} onClick={() => handleClick(index)}>
      {squares[index]}
    </div>
  )
}

export default Square
