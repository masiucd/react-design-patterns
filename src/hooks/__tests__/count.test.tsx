import { useCount } from "../count"
import { renderHook, act } from "@testing-library/react-hooks"

describe("useCount", () => {
  test("should work a expected when initialCount is set to 0 and step to 1", () => {
    const { result } = renderHook(() => useCount({ initialCount: 0, step: 1 }))

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())

    expect(result.current.count).toBe(1)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    act(() => result.current.reset())
    expect(result.current.count).toBe(0)
  })
  test("should work a expected when initialCount is set to 0 and step to 2", () => {
    const { result } = renderHook(() => useCount({ initialCount: 0, step: 5 }))

    expect(result.current.count).toBe(0)

    act(() => result.current.increment())

    expect(result.current.count).toBe(5)

    act(() => result.current.decrement())
    expect(result.current.count).toBe(0)

    act(() => result.current.increment())
    act(() => result.current.reset())
    expect(result.current.count).toBe(0)
  })
})
