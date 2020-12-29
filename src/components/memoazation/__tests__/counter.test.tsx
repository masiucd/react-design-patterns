import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import { Counter } from "../counter"

describe("<Counter/>", () => {
  test("should work as expected ", () => {
    render(<Counter />)
    const btnOne = screen.getByTestId("button-btn-1")
    const btnTwo = screen.getByTestId("button-btn-2")

    expect(btnOne.textContent).toBe("0")
    expect(btnTwo.textContent).toBe("0")

    userEvent.click(btnOne)
    userEvent.click(btnTwo)

    expect(btnOne.textContent).toBe("1")
    expect(btnTwo.textContent).toBe("1")
  })
})
