import React from "react"
import { ContentOf } from "../elements/content-of"
import { ContentOn } from "../elements/content-on"
import ToggleSwitch from "../elements/toggle-switch"
import Toggler from "../elements/toggler"

const TogglerWrapper = () => {
  return (
    <Toggler>
      <ToggleSwitch />
      <ContentOn>
        I will show we The toggle is on using React.Children and React.cloneElement
      </ContentOn>
      <ContentOf>
        I will show when toggle is off, using React.Children and React.cloneElement
      </ContentOf>
    </Toggler>
  )
}
export default TogglerWrapper
