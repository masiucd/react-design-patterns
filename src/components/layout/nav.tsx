import React from "react"
import { css, cx } from "@emotion/css"
import styled from "@emotion/styled"
import { motion } from "framer-motion"
import { NavList } from "./nav-list"
import { useScroll } from "../../hooks/scroll"

interface navProps {
  handleTheme: () => void
  theme: string
}

const navStyles = () =>
  css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: var(--background);
    color: var(--textColor);
    box-shadow: var(--shadowMd);
    padding: 1rem;
  `

const ToggleBtn = styled(motion.button)`
  background: transparent;
  padding: 1.5rem;
  font-size: 1.5rem;
  cursor: pointer;
  border: none;
  outline: none;
`

const Nav: React.FC<navProps> = ({ handleTheme, theme }) => {
  const { scrollX, scrollY, scrollDirection } = useScroll()
  console.log("scrollY ", scrollY)
  console.log("scrollX ", scrollX)
  console.log("scrollDirection ", scrollDirection)
  return (
    <nav className={cx(navStyles())}>
      <ToggleBtn onClick={handleTheme} whileHover={{ scale: 0.85 }} transition={{ duration: 0.4 }}>
        {theme === "dark" ? "🌞" : "🌑"}
      </ToggleBtn>
      <NavList />
    </nav>
  )
}
export default Nav
