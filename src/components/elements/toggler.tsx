import React, { useState } from "react"

interface TogglerProps {
  children?: React.ReactNode
}

const Toggler: React.FC<TogglerProps> = ({ children, ...props }) => {
  const [on, setOn] = useState(false)

  const toggle = (): void => {
    setOn(p => !p)
  }

  return (React.Children.map(children, child => {
    return React.cloneElement(child as any, { on, toggle, ...props })
  }) as unknown) as JSX.Element
}
export default Toggler
