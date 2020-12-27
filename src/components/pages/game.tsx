import { css } from "@emotion/css"
import Title from "../elements/title"
import Game from "../tic-tac-toe/game"

const f = css`
  /* background-color: red; */
`

const GamePage = () => {
  return (
    <div>
      <Title mainTitle="tic tac toe" subTitle="React game" className={f} />
      <Game />
    </div>
  )
}

export default GamePage
