import React, { useRef } from "react"
import { useClickOutside } from "../../hooks/click-outside"
import { useToggle } from "../../hooks/toggle"
import { BtnPrimary } from "../styled/button"
import { Content } from "./content"

const Accordion: React.FC = () => {
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
    <>
      <BtnPrimary ref={ref} onClick={handleClickInside}>
        {on ? "hide" : "show"}{" "}
      </BtnPrimary>

      <Content on={on} />
    </>
  )
}
export default Accordion
