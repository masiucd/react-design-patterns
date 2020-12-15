import React, { memo } from "react"
import styled from "@emotion/styled"

interface CountButtonProps {
  count: number
  onClick: () => void
}

const Button = styled.button`
  font-size: 2em;
`

const CountButton = memo(({ count, onClick }: CountButtonProps) => {
  console.log("%c render CountButton", "background: #9C27B0; color: #fff")
  return <Button onClick={onClick}>{count}</Button>
})

export default CountButton
