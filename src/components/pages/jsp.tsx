import { Suspense, lazy } from "react"
import { css } from "@emotion/css"
import Title from "../elements/title"
const JsonPlaceholderData = lazy(() => import("../json-placeholder-data/json-placeholder-data"))

const titleStyles = css`
  box-shadow: none;
`

const JsonPlaceHolderPage = () => {
  return (
    <>
      <Title mainTitle="json placeholder data" className={titleStyles} />
      <Suspense fallback={<div>...loading</div>}>
        <JsonPlaceholderData />
      </Suspense>
    </>
  )
}
export default JsonPlaceHolderPage
