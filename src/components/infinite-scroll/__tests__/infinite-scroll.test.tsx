import { fireEvent, render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import InfiniteScroll from "../index"
describe("<InfiniteScroll/>", () => {
  test("should render and work as expected when scrolling", async () => {
    render(<InfiniteScroll />)

    const list = screen.getByTestId("task-list-InfiniteScroll")
    expect(list.children.length).toBe(5)
    expect(list.children.length).not.toBeGreaterThan(5)

    fireEvent.scroll(window, { target: { scrollY: 500 } })

    expect(list.children.length).toBeGreaterThan(5)
  })
})
