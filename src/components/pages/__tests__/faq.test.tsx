import { fireEvent, render, screen } from "@testing-library/react"
import FaqPage from "../faq"

describe("faq page", () => {
  test("should render correctly", async () => {
    render(<FaqPage />)

    const listElement = screen.getByTestId("task-list-InfiniteScroll")
    expect(listElement.children.length).toBe(5)

    fireEvent.scroll(window, { scrollY: 500 })
    expect(listElement.children.length).toBe(10)
  })
})
