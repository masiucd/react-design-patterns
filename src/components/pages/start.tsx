import React, { useRef } from "react"
import { useClickOutside } from "../../hooks/click-outside"
import styled from "@emotion/styled"
import { useToggle } from "../../hooks/toggle"
import { BtnPrimary } from "../elements/button"

const StyledWrapper = styled.div`
  border: 2px solid rebeccapurple;
`

const Start = () => {
  const ref = useRef(null)
  const { on, setOffFn, toggle } = useToggle()

  const handleClickOutside = () => {
    console.log("clicked outside")
    setOffFn()
  }
  useClickOutside(ref, handleClickOutside)

  const handleClickInside = () => {
    toggle()

    console.log("clicked inside")
  }

  return (
    <div>
      <h1>Start Page</h1>

      <BtnPrimary ref={ref} onClick={handleClickInside}>
        {" "}
        {on ? "hide" : "show"}{" "}
      </BtnPrimary>
      <StyledWrapper>{on ? <h1>hello</h1> : null}</StyledWrapper>
    </div>
  )
}

export default Start
