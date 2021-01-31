import { css } from "@emotion/css"
import Title from "../elements/title"
import Game from "../tic-tac-toe/game"
import GameWithReducer from "../tic-tac-toe/game-with-reducer"

const f = css``

const GamePage = () => {
  return (
    <>
      <Title mainTitle="tic tac toe" subTitle="With react state" className={f} />
      <Game />
      <Title mainTitle="tic tac toe" subTitle="With react Reducer" className={f} />
      <GameWithReducer />
    </>
  )
}

export default GamePage
