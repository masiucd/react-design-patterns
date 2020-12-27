import React, { useState } from "react"
import { cx, css } from "@emotion/css"
import { validationHandler } from "../../utils/form-validation"

const loginStyles = () => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    label {
      display: flex;
      flex-direction: column;
      margin-bottom: 1.5em;
      span {
        text-transform: capitalize;
      }
    }
    input {
      padding: 0.2em 0.4em;
      font-size: 1.2rem;
      width: 16em;
      border-radius: var(--border-radius);
      border: 2px solid var(--textColor);
      transition: var(--main-trans);
      &:focus {
        outline: none;
        width: 15.5em;
        border: 2px solid var(--red);
      }
    }
    button {
      padding: 0.2em 0.4em;
      font-size: 1.2rem;
      width: 16em;
      border-radius: var(--border-radius);
      border: 0;
      background: var(--textColor);
      outline: 0;
      margin: 2rem auto;
      cursor: pointer;
    }
  `
}

interface LoginData {
  username: string
  password: string
}

interface Props {
  onSubmit: (data: LoginData) => void
}

const LoginForm: React.FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [userNameError, setUsernameError] = useState("")
  const [passwordError, setPasswordError] = useState("")

  const clear = (): void => {
    setPasswordError("")
    setUsernameError("")
  }
  const clearFields = (): void => {
    setUsername("")
    setPassword("")
  }

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    validationHandler(username, password, setUsernameError, setPasswordError, onSubmit, clear)

    clearFields()
  }

  const handleChange = (
    event: React.ChangeEvent<HTMLInputElement>,
    dispatch: React.Dispatch<React.SetStateAction<string>>
  ) => {
    const { value } = event.target

    dispatch(value)
  }

  return (
    <form className={cx(loginStyles())} onSubmit={handleSubmit}>
      <label htmlFor="username">
        <span>username</span>
        <input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={e => handleChange(e, setUsername)}
        />
        {userNameError && <strong>{userNameError}</strong>}
      </label>

      <label htmlFor="username">
        <span>password</span>
        <input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => handleChange(e, setPassword)}
        />
        {passwordError && <strong>{passwordError}</strong>}
      </label>

      <button type="submit">submit</button>
    </form>
  )
}
export default LoginForm
