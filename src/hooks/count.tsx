import { useState } from "react"

interface UseCount {
  count: number
  increment: () => void
  decrement: () => void
  reset: () => void
}

interface Args {
  initialCount: number
  step: number
}

export const useCount = ({ initialCount = 0, step = 1 } = {}): UseCount => {
  const [count, setCount] = useState(initialCount)

  const increment = () => setCount(p => p + step)
  const decrement = () => setCount(p => p - step)
  const reset = () => setCount(0)

  return { count, increment, decrement, reset }
}
