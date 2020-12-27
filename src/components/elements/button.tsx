import styled from "@emotion/styled"

export const BtnPrimary = styled.button`
  padding: 0.4em 0.6em;
  font-size: 1.2em;
  width: 12em;
  display: block;
  margin: 0 auto;
  cursor: pointer;
  color: var(--background);
  background-color: var(--textColor);
  border: none;
  border-radius: 4px;
  outline: 0;
  box-shadow: var(--shadowMd);
  transition: var(--main-trans);
  &:active {
    position: relative;
    top: 6px;
    box-shadow: var(--shadowXl);
  }
  &:hover {
    color: var(--textColor);
    background-color: var(--background);
  }
`
