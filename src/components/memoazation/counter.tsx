import { useCallback, useState } from "react"
import CountButton from "./count-button"
import { css, cx } from "@emotion/css"

const countStyles = () =>
  css`
    margin: 2rem auto;
    max-width: 700px;
    display: flex;
    justify-content: center;
  `

export const Counter = () => {
  const [count, setCount] = useState(0)
  const [count2, setCount2] = useState(0)

  const increment1 = useCallback(() => setCount(prevCount => prevCount + 1), [])
  const increment2 = useCallback(() => setCount2(prevCount2 => prevCount2 + 1), [])

  return (
    <div className={cx(countStyles())}>
      <CountButton count={count} onClick={increment1} dataTestid="btn-1" />
      <CountButton count={count2} onClick={increment2} dataTestid="btn-2" />
    </div>
  )
}
