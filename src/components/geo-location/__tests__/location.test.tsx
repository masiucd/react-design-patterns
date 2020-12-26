import { render, screen } from "@testing-library/react"
import { act } from "react-dom/test-utils"
import Location from "../geo-location"

beforeAll(() => {
  window.navigator.geolocation = {
    getCurrentPosition: jest.fn(),
  }
})
afterAll(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
})

afterEach(() => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
})
function defered() {
  let resolve
  let reject
  const promise = new Promise((res, rej) => {
    resolve = res
    reject = rej
  })

  return { promise, resolve, reject }
}

describe("<Location/>", () => {
  test("should ", async () => {
    const fakePosition = {
      coords: {
        latitude: 35,
        longitude: 139,
      },
    }
    const { promise, resolve } = defered()

    window.navigator.geolocation.getCurrentPosition.mockImplementation(
      (callback: (value: unknown) => void) => {
        promise.then(() => callback(fakePosition))
      }
    )

    render(<Location />)
    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    await act(async () => {
      resolve()

      await promise
    })

    expect(screen.queryByText(/loading/i)).not.toBeInTheDocument()
    expect(screen.getByText(/latitude/i).textContent).toBe(
      `Latitude: ${fakePosition.coords.latitude}`
    )
    expect(screen.getByText(/longitude/i).textContent).toBe(
      `Longitude: ${fakePosition.coords.longitude}`
    )
  })
})
