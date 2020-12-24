import { css, cx } from "@emotion/css"
import LoginSubmission from "../login-form/login-submission"

const styles = () =>
  css`
    h1 {
      font-size: 3rem;
      text-align: center;
    }
  `

const LoginPage = () => {
  return (
    <div className={cx(styles())}>
      <h1>Login</h1>
      <LoginSubmission />
    </div>
  )
}

export default LoginPage
