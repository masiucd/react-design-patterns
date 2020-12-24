import styled from "@emotion/styled"
import { motion } from "framer-motion"
import React from "react"

interface Props {
  on: boolean
}

const StyledWrapper = styled(motion.div)`
  padding: 1rem;
`

export const Content = ({ on }: Props) => {
  const variants = {
    on: { opacity: 1, height: "auto" },
    off: { opacity: 0, height: 0 },
  }
  return (
    <div>
      <StyledWrapper initial="off" animate={on ? "on" : "off"} variants={variants}>
        {on ? (
          <p>
            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate exercitationem, iste
            quos quas necessitatibus assumenda soluta perferendis? Molestiae, corporis temporibus
            quas, doloremque nemo enim repellat, recusandae ipsam quo blanditiis atque.
          </p>
        ) : null}
      </StyledWrapper>
    </div>
  )
}
