import { render, screen } from "@testing-library/react"
import StartPage from "../start"
import userEvent from "@testing-library/user-event"

afterAll(() => {
  jest.clearAllMocks()
  jest.resetAllMocks()
})

afterEach(() => {
  jest.resetAllMocks()
  jest.restoreAllMocks()
})

describe("<StartPage/>", () => {
  test("should renders correctly", async () => {
    const coords = {
      latitude: 50,
      longitude: 125,
    }
    const mockedGeoLocation = {
      getCurrentPosition: jest.fn().mockImplementation(cb =>
        Promise.resolve(
          cb({
            coords,
          })
        )
      ),
    }

    global.navigator.geolocation = mockedGeoLocation

    render(<StartPage />)

    const contentWrapper = screen.getByTestId("content-component-content")
    const loadingsElement = screen.getAllByText(/loading/i)

    expect(screen.getByText(/start page/i)).toBeInTheDocument()
    expect(contentWrapper).toBeInTheDocument()

    for (const el of loadingsElement) {
      expect(el).toBeInTheDocument()
    }

    const buttonShowElement = screen.getByRole("button", { name: "show" })

    userEvent.click(buttonShowElement)
    expect(screen.getByTestId("content-paragraph")).toBeInTheDocument()

    userEvent.click(buttonShowElement)
    expect(screen.queryByTestId("content-paragraph")).not.toBeInTheDocument()

    expect(screen.getByText(/latitude/i).textContent).toBe(`Latitude: ${coords.latitude}`)
    expect(screen.getByText(/longitude/i).textContent).toBe(`Longitude: ${coords.longitude}`)
  })
})
