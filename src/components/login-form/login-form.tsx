import React, { useState } from "react"
import { cx, css } from "@emotion/css"
import { validationHandler } from "../../utils/form-validation"
import { Input, Label } from "../styled/form-elements"
import { Button } from "../styled/button"

const loginStyles = () => {
  return css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
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
      <Label htmlFor="username">
        <span>username</span>
        <Input
          type="text"
          name="username"
          id="username"
          value={username}
          onChange={e => handleChange(e, setUsername)}
        />
        {userNameError && <strong>{userNameError}</strong>}
      </Label>

      <Label htmlFor="username">
        <span>password</span>
        <Input
          type="password"
          name="password"
          id="password"
          value={password}
          onChange={e => handleChange(e, setPassword)}
        />
        {passwordError && <strong>{passwordError}</strong>}
      </Label>

      <Button type="submit">submit</Button>
    </form>
  )
}
export default LoginForm
