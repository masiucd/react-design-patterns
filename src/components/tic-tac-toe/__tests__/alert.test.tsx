import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"

import { Alert } from "../alert"

describe("<Alert/>", () => {
  test("when winner is not set ", () => {
    let winner = false
    const winningChar = "X"
    const newGame = jest.fn(() => (winner = true))

    render(<Alert winner={winner} winningChar={winningChar} newGame={newGame} />)

    expect(screen.getByTestId("alert-component")).toHaveStyle({
      opacity: 0,
      transform: "translateY(-100%) translateZ(0)",
    })
    expect(screen.queryByRole("button", { name: /new game/i })).not.toBeInTheDocument()
  })
  test("When there is a winner", () => {
    let winner = true
    const winningChar = "X"
    const newGame = jest.fn().mockImplementation(() => {
      winner = false
    })

    render(<Alert winner={winner} winningChar={winningChar} newGame={newGame} />)

    expect(screen.getByText(`Winner is player ${winningChar}`)).toBeInTheDocument()

    userEvent.click(screen.getByRole("button", { name: /new game/i }))
    expect(newGame).toHaveBeenCalled()
  })
})
