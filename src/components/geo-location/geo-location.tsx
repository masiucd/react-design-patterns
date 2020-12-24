import { useLocation } from "../../hooks/location"

function Location() {
  const { position, error } = useLocation()

  if (!position && !error) {
    return <div>...Loading</div>
  }

  if (error) {
    return (
      <div role="alert" style={{ color: "red" }}>
        {error}
      </div>
    )
  }

  return (
    <div>
      <p>Latitude: {position && position.coords.latitude}</p>
      <p>Longitude: {position && position.coords.longitude}</p>
    </div>
  )
}

export default Location
