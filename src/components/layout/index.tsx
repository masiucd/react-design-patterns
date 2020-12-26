import React from "react"
import GlobalStyles from "../../styles/global-styles"
import styled from "@emotion/styled"
import { Typography } from "../../styles/typography"
import useTheme from "../../hooks/theme"
import Nav from "./nav"

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
      <Nav handleTheme={handleTheme} theme={theme} />
      <Main>{children}</Main>
    </>
  )
}

export default Layout
