import React, { useEffect } from "react"

interface ChildProps {
  bar: () => void
  baz: () => number[]
}
export const Child = ({ bar, baz }: ChildProps) => {
  const fn = (options: Record<string, any>) => {
    console.log(options)
  }
  useEffect(() => {
    const options = { bar, baz }
    fn(options)
  }, [bar, baz])
  return (
    <div>
      <p>Child here</p>
    </div>
  )
}
