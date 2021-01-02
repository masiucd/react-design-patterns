import { useCount } from "../../hooks/count"
import { css } from "@emotion/css"
import { useCallback, useEffect, useRef, useState } from "react"
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

const btnWrapperStyles = () =>
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
  const { count: restTime, increment: incrementRestTime, reset: resetRestTime } = useCount({
    initialCount: 0,
    step: 1,
  })

  const [round, setRound] = useState(0)

  const functionRef = useRef<React.MutableRefObject<undefined> | (() => void)>()
  const restFunctionRef = useRef<React.MutableRefObject<undefined> | (() => void)>()

  const runRestTimer = useCallback(() => {
    restFunctionRef.current = initCounter(1000)(() => {
      incrementRestTime()
    })
  }, [incrementRestTime])

  const runTimer = useCallback(() => {
    functionRef.current = initCounter(1000)(() => {
      increment()
    })
  }, [increment])

  const stopTimer = () => {
    if (functionRef.current !== undefined && typeof functionRef.current === "function") {
      functionRef.current()
    }
  }

  const stopRestTime = () => {
    if (restFunctionRef.current !== undefined && typeof restFunctionRef.current === "function") {
      restFunctionRef.current()
    }
  }

  useEffect(() => {
    if (count > 20) {
      reset()
      stopTimer()
      runRestTimer()
      setTimeout(() => {
        runTimer()
      }, 10005)
    }
  }, [count, reset, runRestTimer, runTimer])

  useEffect(() => {
    if (restTime >= 10) {
      resetRestTime()
      stopRestTime()
      setRound(p => p + 1)
    }
  }, [resetRestTime, restTime])

  useEffect(() => {
    if (round === 8) {
      reset()
      stopTimer()
      stopRestTime()
      setRound(0)
    }
  }, [reset, round])

  return (
    <div className={`tabata-wrapper ${styles()}`}>
      <div className="text">
        <h3>Tabata</h3>
        <p>Round{round}</p>
        <h3>{count}</h3>
        <p>rest time {restTime}</p>
      </div>
      <div className={`btn-wrapper ${btnWrapperStyles()}`}>
        <motion.button whileHover={{ scale: 1.1 }} onClick={runTimer}>
          start
        </motion.button>
        <motion.button onClick={stopTimer} whileHover={{ scale: 1.1 }}>
          stop
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.1 }}
          onClick={() => {
            reset()
            setRound(0)
            stopRestTime()
          }}
        >
          reset
        </motion.button>
      </div>
    </div>
  )
}

export default Tabata
