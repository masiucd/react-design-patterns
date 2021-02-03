import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Switch from "../switch"

describe("switch", () => {
  test("should render as expected with given props", () => {
    const props = {
      on: true,
      onClick: jest.fn(),
      className: "className",
      ariaLabel: "ariaLabel",
    }
    render(<Switch {...props} />)

    userEvent.click(screen.getByLabelText(/arialabel/i))

    expect(props.onClick).toHaveBeenCalledTimes(1)

    expect(screen.getByTestId("switch-span-element")).toHaveClass(props.className)
  })
})
