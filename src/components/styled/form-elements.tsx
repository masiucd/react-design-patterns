import styled from "@emotion/styled"

export const Input = styled.input`
  padding: 0.2em 0.4em;
  font-size: 1.2rem;
  width: 16em;
  border-radius: var(--border-radius);
  border: 2px solid var(--textColor);
  transition: var(--main-trans);
  outline: none;
  &:focus {
    width: 15.5em;
    border: 2px solid var(--red);
  }
`

export const Label = styled.label`
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5em;
  span {
    text-transform: capitalize;
  }
`
