import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import CountButton from "../count-button"

describe("<CountButton/>", () => {
  test("should increment count adn render as expected", () => {
    let count = 0
    const onClick = jest.fn().mockImplementation(() => ++count)
    const dataTestid = "dataTestid"
    console.log(count)
    render(<CountButton count={count} onClick={onClick} dataTestid={dataTestid} />)

    const btn = screen.getByTestId(`button-${dataTestid}`)

    expect(count).toBe(0)
    userEvent.click(btn)

    expect(onClick).toHaveBeenCalledTimes(1)
    expect(count).toBe(1)
  })
})
