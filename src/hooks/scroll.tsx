import { useCallback, useEffect, useState } from "react"

const useScroll = () => {
  const [bodyOffset, setBodyBoundary] = useState(document.body.getBoundingClientRect())
  const [scrollY, setScrollY] = useState(bodyOffset.top)
  const [scrollX, setScrollX] = useState(bodyOffset.left)
  const [prevTop, setPrevTop] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<"Up" | "Down">("Down")

  const handleScroll = useCallback(() => {
    setBodyBoundary(document.body.getBoundingClientRect())
    setScrollY(-bodyOffset.top)
    setScrollX(bodyOffset.left)
    setPrevTop(-bodyOffset.top)
    setScrollDirection(prevTop > -bodyOffset.top ? "Down" : "Up")
  }, [bodyOffset.left, bodyOffset.top, prevTop])

  useEffect(() => {
    window.addEventListener("scroll", handleScroll)

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [handleScroll])

  return {
    scrollY,
    scrollX,
    scrollDirection,
  }
}

export { useScroll }
