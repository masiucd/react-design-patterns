import { css, cx } from "@emotion/css"
import { BtnPrimary } from "../elements/button"
import { useToggle } from "../../hooks/toggle"
import Switch from "../elements/switch"
import { useState } from "react"

const styles = css`
  padding: 3rem 1rem;
  border: 1px solid #000;
  display: flex;
  justify-content: center;
  flex-direction: column;
  button {
    margin: 1rem auto;
  }
`

const StateReducer = () => {
  const { on, setOffFn, setOnFn, toggle } = useToggle()
  const [click, setClick] = useState(0)
  const tooManyClick = click >= 3

  function handleClick() {
    toggle()
    setClick(count => count + 1)
  }

  return (
    <div className={cx(styles)}>
      <BtnPrimary onClick={setOffFn}>Switch Off</BtnPrimary>
      <BtnPrimary onClick={setOnFn}>Switch On</BtnPrimary>
      <Switch on={on} onClick={handleClick} />
      {tooManyClick && (
        <>
          <p>You have reached the limit!</p>
          <BtnPrimary onClick={() => setClick(0)}>Reset</BtnPrimary>
        </>
      )}
    </div>
  )
}

export default StateReducer
