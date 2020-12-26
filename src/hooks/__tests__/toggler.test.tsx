import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { act } from "react-dom/test-utils"
import { useToggler } from "../toggler"

interface UseToggler {
  state: boolean
  setToFalse: () => void
  setToTrue: () => void
  toggler: () => void
}

describe("useToggler", () => {
  let result: Partial<UseToggler>
  function TestComp() {
    result = useToggler()
    return null
  }

  test("should work as expected with a test component approach ", () => {
    render(<TestComp />)

    expect(result.state).toBeFalsy()

    act(() => {
      if (result.setToTrue) {
        result.setToTrue()
      }
    })
    expect(result.state).toBeTruthy()

    act(() => {
      if (result.setToFalse) {
        result.setToFalse()
      }
    })
    expect(result.state).toBeFalsy()

    act(() => {
      if (result.toggler) {
        result.toggler()
        result.toggler()
      }
    })
    expect(result.state).toBeFalsy()
  })
})
