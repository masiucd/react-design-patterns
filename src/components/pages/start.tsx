import Accordion from "../accordion/accordion"
import Location from "../geo-location/geo-location"
import Users from "../users/users"

const Start = () => {
  return (
    <>
      <h1>Start Page</h1>
      <Users />
      <Location />
      <Accordion />
    </>
  )
}

export default Start
