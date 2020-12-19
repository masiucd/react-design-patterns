import React from "react"
import { css, cx } from "@emotion/css"

interface ToggleSwitchProps {}

const btnStyles = () =>
  css`
    padding: 0.4em 0.6em;
    font-size: 1.2em;
    width: 12em;
    display: block;
    margin: 0 auto;
    cursor: pointer;
    color: var(--background);
    background-color: var(--textColor);
    border: none;
    border-radius: 4px;
    outline: 0;
  `

interface P {
  toggle: () => void
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ ...props }) => {
  const p = props as P
  return (
    <button className={cx(btnStyles())} onClick={p.toggle}>
      Click
    </button>
  )
}
export default ToggleSwitch
