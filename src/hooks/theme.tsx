import { useEffect } from "react"
import useLocalStorage from "./local-storage"

const useTheme = (value: string = "light"): [string, () => void] => {
  const { state: theme, setState: setTheme } = useLocalStorage("theme", value)

  const handleTheme = (): void => {
    const nextTheme = theme === "light" ? "dark" : "light"
    setTheme(nextTheme)
  }

  useEffect(() => {
    document.body.dataset.theme = theme
  }, [theme])

  return [theme, handleTheme]
}

export default useTheme
