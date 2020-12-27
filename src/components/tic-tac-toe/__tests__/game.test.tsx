import { render, screen } from "@testing-library/react"
import Game from "../game"

describe("<Game/>", () => {
  test("should render as expected", () => {
    render(<Game />)

    expect(document.querySelector(".game-wrapper")?.children.length).toBe(9)
  })
})
