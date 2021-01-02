import Accordion from "../accordion/accordion"
import Carousel from "../carousel/carousel"
import Location from "../geo-location/geo-location"
import Users from "../users/users"

const Start = () => {
  return (
    <div>
      <h1>Start Page</h1>
      <Users />
      <Location />
      <Accordion />
      <Carousel />
    </div>
  )
}

export default Start
