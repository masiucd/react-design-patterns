import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import JsonPlaceHolderPage from "../jsp"

beforeEach(() => {
  jest.clearAllMocks()
})

describe("JsonPlaceHolderPage", () => {
  test("should render correctly ", async () => {
    const fakeUsers = [
      { id: 1, name: "frank", username: "frankie" },
      { id: 2, name: "tina", username: "tinis" },
      { id: 3, name: "greg", username: "gregies" },
    ]

    const fakeAlbums = [
      { id: 1, title: "foo" },
      { id: 2, title: "bar" },
    ]

    // jest.spyOn(global, "fetch").mockImplementation(
    //   (): Promise<any> =>
    //     Promise.resolve({
    //       json: () => Promise.resolve([fakeUsers, fakeAlbums]),
    //     })
    // )

    const { rerender } = render(<JsonPlaceHolderPage />)
    expect(screen.getByText(/json placeholder data/i)).toBeInTheDocument()
    // expect(screen.getByText(/users/i)).toBeInTheDocument()
    // expect(screen.getByText(/albums/i)).toBeInTheDocument()()
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await act(async () => {
      rerender(<JsonPlaceHolderPage />)
    })

    screen.debug()

    //   expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    //   expect(fetch).toHaveBeenCalled()

    //   for (let u of fakeUsers) {
    //     expect(screen.getByText(`${u.name} ${u.email}`)).toBeInTheDocument()
    //   }
  })
})
