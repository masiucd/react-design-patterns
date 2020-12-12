import React from "react"
/** @jsx jsx */
import { jsx } from "@emotion/react"
import styled from "@emotion/styled"
import { cx, css } from "@emotion/css"

const Wrapper = styled.div`
  margin: 0 auto;
`

const cls1 = css`
  font-size: 20px;
  background: green;
`
const cls2 = css`
  font-size: 20px;
  background: blue;
`

function App() {
  return (
    <Wrapper>
      <div className={cx(cls1, cls2)}>
        <h1>Hello</h1>
        <div></div>
      </div>
    </Wrapper>
  )
}

export default App
