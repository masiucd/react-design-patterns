import { useState } from "react"

type Fn = () => void

interface UseToggleReturnType {
  on: boolean
  setOnFn: Fn
  setOffFn: Fn
  toggle: Fn
}

export const useToggle = (initialState: boolean = false): UseToggleReturnType => {
  const [on, setOn] = useState(initialState)

  const toggle = () => {
    setOn(p => !p)
  }

  const setOnFn = () => {
    setOn(true)
  }
  const setOffFn = () => {
    setOn(false)
  }

  return { on, setOffFn, setOnFn, toggle }
}
