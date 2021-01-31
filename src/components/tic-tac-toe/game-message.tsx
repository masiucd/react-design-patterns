import { css, cx } from "@emotion/css"
import styled from "@emotion/styled"
import React from "react"
import { Link } from "react-router-dom"
import Fade from "../elements/fade"

interface GameMessageProps {
  isWinner: boolean
  winner: string | null
  newGame: () => void
}

const fadeStyles = css`
  position: fixed;
  top: -5px;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: var(--textColor);
  border-radius: var(--border-radius);
  box-shadow: 0 0 0 1px var(--textColor);
`
const messageContent = css`
  padding: 1rem;
  color: var(--background);
  border-radius: var(--border-radius);
  box-shadow: 0 0 0 1px var(--textColor);
  h3 {
    text-align: center;
  }
`

const ButtonsWrapper = styled.div`
  padding: 1rem;
  display: flex;
  justify-content: space-evenly;
  width: 20rem;
  button {
    padding: 0.3rem 0.4rem;
    border: none;
    border-radius: var(--border-radius);
    font-size: 1rem;
    cursor: pointer;
    transition: var(--main-trans);
    a {
      color: var(--textColor);
    }
    &:hover {
      color: var(--background);
      background-color: var(--textColor);
      a {
        color: var(--background);
      }
    }
  }
`

const GameMessage: React.FC<GameMessageProps> = ({ isWinner, winner, newGame }) => {
  return (
    <Fade isActive={isWinner} className={fadeStyles}>
      <div className={cx(messageContent)}>
        <h3>Winner is {winner}</h3>
        <ButtonsWrapper>
          <button aria-label="play-again" onClick={newGame}>
            play again
          </button>
          <button aria-label="play-again">
            <Link to="/">nahh ... I am done</Link>
          </button>
        </ButtonsWrapper>
      </div>
    </Fade>
  )
}
export default GameMessage
