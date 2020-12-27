import { css } from "@emotion/css"
import Title from "../elements/title"
import Game from "../tic-tac-toe/game"
import GameWithReducer from "../tic-tac-toe/game-with-reducer"

const f = css`
  /* background-color: red; */
`

const GamePage = () => {
  return (
    <div>
      <Title mainTitle="tic tac toe" subTitle="React game" className={f} />
      <Game />
      <GameWithReducer />
    </div>
  )
}

export default GamePage
