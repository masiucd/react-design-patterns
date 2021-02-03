import styled from "@emotion/styled"

export const Button = styled.button`
  padding: 0.2em 0.4em;
  font-size: 1.2rem;
  width: 16em;
  border-radius: var(--border-radius);
  border: 0;
  background: var(--textColor);
  outline: 0;
  margin: 2rem auto;
  cursor: pointer;
  color: var(--background);
`

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
