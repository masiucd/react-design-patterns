import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Square from "../square"

describe("<Square/>", () => {
  test("should render as expected ", () => {
    const className = "className"
    const squares = ["", "", "", "", "", "", "", "", ""]
    const index = 1
    const handleClick = jest.fn().mockImplementation(() => {
      squares[index] = "X"
    })

    const { rerender } = render(
      <Square className={className} handleClick={handleClick} squares={squares} index={index} />
    )

    userEvent.click(screen.getByTestId("square-item"))
    expect(handleClick).toHaveBeenCalledWith(index)

    rerender(
      <Square className={className} handleClick={handleClick} squares={squares} index={index} />
    )
    expect(screen.getByText(/x/i)).toBeInTheDocument()
  })
})
