import { render, screen, act } from "@testing-library/react"
import StartPage from "../start"
import userEvent from "@testing-library/user-event"

beforeAll(() => {
  // @ts-ignore
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})

function defered(): { promise: Promise<any>; resolve: any; reject: any } {
  let resolve
  let reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })
  return { promise, resolve, reject }
}

describe("<StartPage/>", () => {
  test("should renders correctly and when show button is clicked", async () => {
    const fakePositions = {
      coords: {
        latitude: 35,
        longitude: 139,
      },
    }

    const { promise, resolve } = defered()
    // @ts-ignore
    window.navigator.geolocation.getCurrentPosition.mockImplementation(cb => {
      promise.then(() => cb(fakePositions))
    })

    render(<StartPage />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await act(async () => {
      resolve()
      await promise
    })

    expect(screen.getByText(`Latitude: ${fakePositions.coords.latitude}`)).toBeInTheDocument()
    expect(screen.getByText(`Longitude: ${fakePositions.coords.longitude}`)).toBeInTheDocument()

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()

    expect(screen.queryByTestId("accordion-content")).not.toBeInTheDocument()
    expect(screen.queryByTestId("content-paragraph")).not.toBeInTheDocument()

    userEvent.click(screen.getByRole("button", { name: /show/i }))

    expect(screen.getByTestId("accordion-content")).toBeInTheDocument()
    expect(screen.getByTestId("content-paragraph")).toBeInTheDocument()
  })
})
