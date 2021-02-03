import Accordion from "../accordion/accordion"
import Title from "../elements/title"
import Location from "../geo-location/geo-location"
import { css } from "@emotion/css"

const titleStyles = css`
  box-shadow: none;
  h1 {
    font-size: 3.3rem;
    display: inline-block;
    border-bottom: 2px solid var(--textColor);
  }
`

const Start = () => {
  return (
    <>
      <Title mainTitle="react stuff" className={titleStyles} />
      <Location />
      <Accordion />
    </>
  )
}

export default Start
