import { cx, css } from "@emotion/css"

import React from "react"

const styles = () =>
  css`
    padding: 1rem;
    box-shadow: var(--shadowS);
    transition: var(--main-trans);
    text-align: center;
    margin: 1rem auto;
    &:hover {
      box-shadow: var(--shadowXl);
    }
  `

interface titleProps {
  mainTitle: string
  subTitle?: string
  className?: string
}

const titleHandler = (t: string) => t.split("")[0].toUpperCase() + t.slice(1)

const Title: React.FC<titleProps> = ({ mainTitle, subTitle, className }) => {
  return (
    <section className={cx(`main-title ${styles()} ${className}`)}>
      <h1>{titleHandler(mainTitle)}</h1>
      {subTitle ? <p>{subTitle}</p> : null}
    </section>
  )
}
export default Title
