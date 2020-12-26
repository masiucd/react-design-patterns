import { useState } from "react"

interface UseToggler {
  state: boolean
  setToFalse: () => void
  setToTrue: () => void
  toggler: () => void
}

export const useToggler = (initialState = false): UseToggler => {
  const [state, setState] = useState(initialState)

  const toggler = (): void => {
    setState(p => !p)
  }

  const setToFalse = (): void => {
    setState(false)
  }
  const setToTrue = (): void => {
    setState(true)
  }

  return { state, setToFalse, setToTrue, toggler }
}
