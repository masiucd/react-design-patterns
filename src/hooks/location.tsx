import { useState, useEffect } from "react"

export const useLocation = (options = {}) => {
  const [position, setPositions] = useState<null | GeolocationPosition>(null)

  const [error, setError] = useState<null | GeolocationPositionError>(null)

  useEffect(() => {
    let cancelled = false

    navigator.geolocation.getCurrentPosition(
      pos => {
        if (!cancelled) {
          setPositions(pos)
        }
      },
      err => {
        if (!cancelled) {
          setError(err)
        }
      },
      options
    )
    return () => {
      cancelled = true
    }
  }, [options])

  return { position, error }
}
