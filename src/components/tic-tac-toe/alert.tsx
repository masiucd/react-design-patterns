import React from "react"
import { motion } from "framer-motion"
import { css, cx } from "@emotion/css"
import { BtnPrimary } from "../elements/button"

interface AlertProps {
  winner: boolean
  winningChar: string
  newGame: () => void
}

const styles = () =>
  css`
    position: fixed;
    top: 0;
    left: 0;
    transform: translate(-50%, -50%);
    font-size: 5rem;
    z-index: 5;
    text-align: center;
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    .body {
      background-color: var(--alertColor);
      padding: 2rem 1rem;
      border-radius: var(--border-radius);
      p {
        color: var(--alertText);
        text-shadow: 1px 1px var(--background);
      }
      button {
        font-size: 0.35em;
        padding: 0.3cm;
      }
    }
  `

export const Alert: React.FC<AlertProps> = ({ winner, winningChar, newGame }) => {
  const variants = {
    hide: { opacity: 0, y: "-100%" },
    show: { opacity: 1, y: 0 },
  }

  return (
    <motion.div
      className={cx(styles())}
      initial="hide"
      animate={winner ? "show" : "hide"}
      variants={variants}
      data-testid="alert-component"
    >
      {winner && (
        <div className="body">
          <p>Winner is player {winningChar}</p>
          <BtnPrimary type="button" onClick={() => newGame()}>
            new game
          </BtnPrimary>
        </div>
      )}
    </motion.div>
  )
}
