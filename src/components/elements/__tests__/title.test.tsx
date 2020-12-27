import { render, screen } from "@testing-library/react"
import Title from "../title"

describe("<Title/>", () => {
  test("should render as expected with given props", () => {
    const mainTitle = "mainTitle"
    const subtitle = "subtitle"
    const className = "className"
    render(<Title mainTitle={mainTitle} subTitle={subtitle} className={className} />)

    expect(screen.getByText(/maintitle/i)).toBeInTheDocument()
    expect(screen.getByText(/subtitle/i)).toBeInTheDocument()
    expect(document.querySelector(".main-title")?.classList).toContain(className)
  })
})
