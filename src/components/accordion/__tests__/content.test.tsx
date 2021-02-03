import { render, screen } from "@testing-library/react"
import { Content } from "../content"

describe("content", () => {
  test("should be rendered when ON prop is set to true", () => {
    render(<Content on />)

    expect(screen.getByTestId("fade-motion-section")).toBeInTheDocument()
    expect(screen.getByTestId("fade-motion-section")).toHaveStyle({
      opacity: 0,
      transform: `translateY(-100%) translateZ(0)`,
    })

    expect(screen.getByTestId("accordion-content")).toBeInTheDocument()
    expect(screen.getByTestId("content-paragraph")).toBeInTheDocument()
  })
  test("should NOT be rendered when ON prop is set to false", () => {
    render(<Content on={false} />)

    expect(screen.queryByTestId("fade-motion-section")).not.toBeInTheDocument()

    expect(screen.queryByTestId("accordion-content")).not.toBeInTheDocument()
    expect(screen.queryByTestId("content-paragraph")).not.toBeInTheDocument()
  })
})
