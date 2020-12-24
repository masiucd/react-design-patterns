import React, { useState } from "react"
import { css, cx } from "@emotion/css"
import LoginForm from "../login-form"

const styles = () =>
  css`
    h1 {
      font-size: 3rem;
      text-align: center;
    }
  `

interface LoginData {
  username: string
  password: string
}

const LoginPage = () => {
  const [loginData, setLoginData] = useState<Partial<LoginData>>()
  console.log("loginData", loginData)
  const onSubmit = (data: LoginData) => {
    setLoginData(data)
  }

  return (
    <div className={cx(styles())}>
      <h1>Login</h1>
      <LoginForm onSubmit={onSubmit} />
    </div>
  )
}

export default LoginPage
