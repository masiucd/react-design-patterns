import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import Users from "../users"

beforeEach(() => {
  jest.clearAllMocks()
})

describe("<Users/>", () => {
  test("should set the state with users and render them after component has mounted ", async () => {
    const fakeUsers = [
      { name: "frank", email: "frank@io.com" },
      { name: "tina", email: "tina@io.com" },
      { name: "greg", email: "greg@io.com" },
    ]

    jest.spyOn(global, "fetch").mockImplementation(
      (): Promise<any> =>
        Promise.resolve({
          json: () => Promise.resolve(fakeUsers),
        })
    )

    const { rerender } = render(<Users />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await act(async () => {
      rerender(<Users />)
    })

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    expect(fetch).toHaveBeenCalled()

    for (let u of fakeUsers) {
      expect(screen.getByText(`${u.name} ${u.email}`)).toBeInTheDocument()
    }
  })
})
