import styled from "@emotion/styled"
import { motion } from "framer-motion"
import Fade from "../elements/fade"

interface Props {
  on: boolean
}

const StyledWrapper = styled(motion.div)`
  padding: 1rem;
`

export const Content = ({ on }: Props) => {
  return (
    <Fade
      isActive={on}
      options={{ exit: { y: "100%" }, initial: { y: "-100%" }, animated: { y: 0 } }}
    >
      <StyledWrapper className="content" data-testid="accordion-content">
        <p data-testid="content-paragraph">
          Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptate exercitationem, iste
          quos quas necessitatibus assumenda soluta perferendis? Molestiae, corporis temporibus
          quas, doloremque nemo enim repellat, recusandae ipsam quo blanditiis atque.
        </p>
      </StyledWrapper>
    </Fade>
  )
}
