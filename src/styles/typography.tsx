import React from "react"
import { Global, css } from "@emotion/react"

export const Typography = () => {
  return (
    <>
      <Global
        styles={css`
          @import url("https://fonts.googleapis.com/css?family=Space+Mono:400|Work+Sans:400");

          :root {
            /* Type */
            --headingFont: "Space Mono", monospace;
            --bodyFont: "Work Sans", sans-serif;
            --h1: 3.052em;
            --h2: 2.441em;
            --h3: 1.953em;
            --h4: 1.563em;
            --h5: 1.25em;
            --smallText: 0.8em;
          }

          body {
            font-family: var(--bodyFont);
          }

          h1 {
            font-size: var(--h1);
          }
          h2 {
            font-size: var(--h2);
          }
          h3 {
            font-size: var(--h3);
          }
          h4 {
            font-size: var(--h4);
          }
        `}
      />
    </>
  )
}
