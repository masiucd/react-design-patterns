import React from "react"
import GlobalStyles from "../global-styles"
import styled from "@emotion/styled"
import { Typography } from "./typography"
import useTheme from "../../hooks/theme"

const Main = styled.main`
  margin: 0 auto;
  max-width: 970px;
`

const Layout: React.FC = ({ children }) => {
  const [theme, handleTheme] = useTheme("light")
  return (
    <>
      <GlobalStyles />
      <Typography />
      <button onClick={handleTheme}>Toggle Theme</button>
      <Main>{children}</Main>
    </>
  )
}

export default Layout
