import React from "react"
import { Global, css } from "@emotion/react"

const GlobalStyles = () => {
  return (
    <>
      <Global
        styles={css`
          :root {
            /* Define Colors as colors */
            --green: #00ebc7;
            --red: #ff5470;
            --yellow: #fde24f;
            --black: #1b2d45;
            --dark: #232946;
            --dark2: #121629;
            --pink: #eebbc3;
            --white: #fffffe;
            --greyish: #b8c1ec;
            --blackTransparent: rgba(27, 45, 69, 0.4);
            --white: #feffff;
            --darkBlue: #00214d;
            --grey: #bfbfbf;
            --lightGrey: #f2f4f6;
            --transparentDark: rgba(0, 0, 0, 0.05);
            --transparentDark2: rgba(0, 0, 0, 0.1);
            --transparentDark3: rgba(0, 0, 0, 0.06);
            /* Define Colors intentions */

            --primary: var(--green);
            --danger: var(--red);
            --background: var(--lightGrey);
            --headerAndFooterBg: var(--black);
            --headerAndFooterColor: var(--white);
            --textColor: var(--black);
            --lineColor: var(--grey);
            --border-left-color: var(--black);

            /* elements */
            --bg: var(--dark);
            --paragraph: var(--greyish);
            --button: var(--pink);
            --button-text: var(--dark);

            /* Styles */
            --line: solid 1px var(--lineColor);

            /* Elevations */
            --shadowXs: 0 0 0 1px var(--transparentDark);
            --shadowS: 0 1px 2px 0 var(--transparentDark);
            --shadow: 0 1px 3px 0 var(--transparentDark2), 0 1px 2px 0 var(--transparentDark3);
            --shadowMd: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
            --shadowLg: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
            --shadowXl: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
            --shadow2Xl: 0 25px 50px -12px rgba(0, 0, 0, 0.85);
            --shadowInner: inset 0 2px 4px 0 rgba(0, 0, 0, 0.06);
            --shadowOutline: 0 0 0 3px rgba(66, 153, 225, 0.5);

            /* positioning */
            --containerPadding: 2.5%;
            --headerHeight: 10rem;

            /* Utils */
            --border-radius: 4px;

            /* transitions */
            --main-trans: 300ms ease-in all;
          }

          *::before,
          *::after,
          * {
            box-sizing: inherit;
            margin: 0;
            padding: 0;
          }

          html {
            font-size: 112.5%;
            scroll-behavior: smooth;
            box-sizing: border-box;
          }

          /*18px*/

          body {
            font-weight: 400;
            line-height: 1.65;
            background: var(--background);
            color: var(--textColor);
          }

          body[data-theme="light"] {
            --textColor: var(--black);
            --background: var(--white);
            --lineColor: var(--greyish);
          }
          body[data-theme="dark"] {
            --textColor: var(--green);
            --background: var(--dark2);
            --lineColor: var(--blueGreen);
          }

          ul,
          li {
            list-style: none;
          }

          li {
            text-decoration: none;
          }
          p {
            color: var(---textColor);
          }
        `}
      />
    </>
  )
}

export default GlobalStyles
