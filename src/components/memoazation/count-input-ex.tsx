import React, { useState } from "react"
import { useCount } from "../../hooks/count"
import CountButton from "./count-button"
import { css } from "@emotion/css"

const styles = () =>
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
  `

const inputStyles = () =>
  css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    padding: 1rem;
    input {
      outline: 0;
    }
  `

interface NameInputProps {
  name: string
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

function NameInput({ name, onChange }: NameInputProps) {
  return (
    <div className={inputStyles()}>
      <label htmlFor="name">
        <span>name</span>
      </label>
      <input type="text" id="name" value={name} onChange={onChange} />
    </div>
  )
}

const CountButtonMemoized = React.memo(CountButton, (prevProps, nextProps): any => {
  // compare Button props
  console.log(prevProps.count, nextProps.count)
  if (prevProps.count !== nextProps.count) {
    console.log("I will re render")
    return false
  }
})
const NameInputMemoized = React.memo(NameInput)

function Example() {
  const { count, increment } = useCount({ initialCount: 0, step: 1 })
  const [name, setName] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value)
  }
  return (
    <div className={styles()}>
      <div>
        <CountButtonMemoized count={count} onClick={increment} />
      </div>
      <div>
        <NameInputMemoized name={name} onChange={handleChange} />
      </div>
      {name ? name + " favorite number is " + count : null}
    </div>
  )
}
export default Example
