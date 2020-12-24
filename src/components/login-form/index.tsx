import React, { useState } from "react"
import { cx, css } from "@emotion/css"

const loginStyles = () => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      padding: 0.2em 0.4em;
      font-size: 1.2rem;
      width: 16em;
      border-radius: var(--border-radius);
      border: 2px solid var(--textColor);
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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const submitData: LoginData = { username, password } as const

    onSubmit(submitData)

    setUsername("")
    setPassword("")
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
      <label htmlFor="username">username</label>
      <input
        type="text"
        name="username"
        id="username"
        value={username}
        onChange={e => handleChange(e, setUsername)}
      />

      <label htmlFor="username">password</label>
      <input
        type="password"
        name="password"
        id="password"
        value={password}
        onChange={e => handleChange(e, setPassword)}
      />

      <button type="submit">submit</button>
    </form>
  )
}
export default LoginForm
