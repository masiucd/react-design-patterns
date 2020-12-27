import { useReducer } from "react"

type Action = { type: "ON" } | { type: "OFF" } | { type: "TOGGLE" }

type State = {
  on: boolean
}

function toggleReducer(state: State, action: Action) {
  switch (action.type) {
    case "ON":
      return {
        ...state,
        on: true,
      }
    case "OFF":
      return {
        ...state,
        on: false,
      }
    case "TOGGLE":
      return {
        ...state,
        on: !state.on,
      }

    default: {
      throw new Error(`Unhandled type: action}`)
    }
  }
}

export const useToggle = ({ reducer = toggleReducer } = {}) => {
  const [{ on }, dispatch] = useReducer(reducer, { on: false })

  const setOffFn = () => dispatch({ type: "OFF" })
  const setOnFn = () => dispatch({ type: "ON" })
  const toggle = () => dispatch({ type: "TOGGLE" })

  return { on, setOffFn, setOnFn, toggle }
}
