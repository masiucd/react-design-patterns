import { render, screen, act, waitForElementToBeRemoved } from "@testing-library/react"
import StartPage from "../start"
import userEvent from "@testing-library/user-event"
import { useState } from "react"
import { useLocation } from "../../../hooks/location"

jest.mock("../../../hooks/location")

describe("<StartPage/>", () => {
  test("should renders correctly", async () => {
    const fakePositions = {
      coords: {
        latitude: 35,
        longitude: 139,
      },
    }

    let setReturnValue: Function

    function useMockCurrentPosition() {
      const state = useState([])
      setReturnValue = state[1]
      return state[0]
    }

    useLocation.mockImplementation(useMockCurrentPosition)

    render(<StartPage />)

    expect(screen.getByText(/loading/i)).toBeInTheDocument()

    act(() => {
      setReturnValue([fakePositions])
    })

    waitForElementToBeRemoved(() => screen.getByText(/loading/i))

    screen.debug()
  })
})
