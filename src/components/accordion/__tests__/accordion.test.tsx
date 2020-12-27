import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import Accordion from "../accordion"

describe("<Accordion/>", () => {
  test("should show paragraph depending if button has been dispatched or not ", () => {
    render(<Accordion />)
    expect(screen.queryByTestId("content-paragraph")).not.toBeInTheDocument()
    userEvent.click(screen.getByRole("button", { name: /show/i }))
    expect(screen.getByTestId("content-paragraph")).toBeInTheDocument()
  })
})
