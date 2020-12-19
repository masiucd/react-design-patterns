import React from "react"

interface P {
  on: boolean
}

export const ContentOn: React.FC<any> = ({ children, ...props }) => {
  const p = props as P

  return p.on && children
}
