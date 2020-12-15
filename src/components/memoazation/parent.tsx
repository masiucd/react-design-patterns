import React, { useCallback } from "react"
import { Child } from "./child"

export const Parent = () => {
  const bar = useCallback(() => {}, [])
  const baz = useCallback(() => [1, 2, 3], [])

  return (
    <div>
      <Child bar={bar} baz={baz} />
    </div>
  )
}
