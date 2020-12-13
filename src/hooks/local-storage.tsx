import { useEffect, useState } from "react"

function useLocalStorage(key: string, defaultValue: string) {
  const [state, setState] = useState(() => localStorage.getItem(key) || defaultValue)

  useEffect(() => {
    localStorage.setItem(key, state)
  }, [key, state])

  return { state, setState }
}

export default useLocalStorage
