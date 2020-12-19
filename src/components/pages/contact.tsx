import React from "react"
import { ContentOf } from "../elements/content-of"
import { ContentOn } from "../elements/content-on"
import ToggleSwitch from "../elements/toggle-switch"

import Toggler from "../elements/toggler"

const ContactPage = () => {
  return (
    <div>
      <Toggler>
        <ToggleSwitch />
        <ContentOn>I will show we The toggle is on</ContentOn>
        <ContentOf>I will show when toggle is off</ContentOf>
      </Toggler>
    </div>
  )
}
export default ContactPage
