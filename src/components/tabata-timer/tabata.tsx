import { useCount } from "../../hooks/count"
import { css, cx } from "@emotion/css"
import { useRef } from "react"
import { motion } from "framer-motion"

const styles = () => css`
  .text {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    h3 {
      font-size: 6rem;
    }
  }
`

const btnWrapperStyles = (on: boolean) =>
  css`
    display: flex;
    padding: 1rem;
    justify-content: center;
    button {
      margin: 1rem;
      font-size: 1.5rem;
      background: transparent;
      border-radius: 50%;
      outline: none;
      width: 72px;
      height: 72px;
      cursor: pointer;
      border: none;
      box-shadow: 0 0 0 3px var(--textColor);
      color: var(--textColor);
    }
  `

const initCounter = (time: number) => (fn: () => void) => {
  const id = setInterval(fn, time)

  return () => {
    clearInterval(id)
  }
}

const Tabata = () => {
  const { count, increment, reset } = useCount({ initialCount: 0, step: 1 })

  const functionRef = useRef<React.MutableRefObject<undefined> | (() => void)>()
  const btnRef = useRef(false)

  const runTimer = () => {
    btnRef.current = true
    functionRef.current = initCounter(1000)(() => {
      increment()
    })
  }

  const stopTimer = () => {
    if (functionRef.current !== undefined && typeof functionRef.current === "function") {
      functionRef.current()
    }
  }

  return (
    <div className={`tabata-wrapper ${styles()}`}>
      <div className="text">
        <h1>Tabata</h1>
        <h3>{count}</h3>
      </div>
      <div className={`btn-wrapper ${btnWrapperStyles(btnRef.current)}`}>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={runTimer}
          disabled={btnRef.current}
          style={{ color: btnRef.current ? "var(--danger)" : "var(--textColor)" }}
        >
          start
        </motion.button>
        <motion.button onClick={stopTimer} whileHover={{ scale: 1.1 }}>
          stop
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            btnRef.current = false
            reset()
          }}
        >
          reset
        </motion.button>
      </div>
    </div>
  )
}

export default Tabata
