type Dispatch = (value: React.SetStateAction<string>) => void

interface LoginData {
  username: string
  password: string
}

export const formValidation = (username: string, password: string) => {
  const reUsername = /^[a-zA-Z0-9_@#!%]{5,}[a-zA-Z]+[0-9]*$/g
  const rePassword = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g

  return { usernameMatch: username.match(reUsername), passwordMatch: password.match(rePassword) }
}

export const validationHandler = (
  username: string,
  password: string,
  usernameErrorDispatch: Dispatch,
  passwordErrorDispatch: Dispatch,
  handler: (data: LoginData) => void,
  clear: () => void
) => {
  const { usernameMatch, passwordMatch } = formValidation(username, password)

  if (!usernameMatch && !passwordMatch) {
    usernameErrorDispatch("Please fill in the right format of the username")
    passwordErrorDispatch("Password does not match the credentials")
    setTimeout(() => {
      clear()
    }, 5000)
    return
  } else if (!usernameMatch) {
    usernameErrorDispatch("Please fill in the right format of the username")
    return
  } else if (!passwordMatch) {
    passwordErrorDispatch("Password does not match the correct format")
  } else {
    handler({ username, password })
  }
}

const validateUsername = (username: string): boolean =>
  Boolean(username.match(/^[a-zA-Z0-9_@#!%]{5,}[a-zA-Z]+[0-9]*$/g))

const validatePassword = (password: string): boolean =>
  Boolean(password.match(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/g))

export const usernameValidationHandler = (username: string, dispatch: Dispatch, msg: string) =>
  validateUsername(username) ? validateUsername(username) : dispatch(msg)

export const passwordValidationHandler = (password: string, dispatch: Dispatch, msg: string) =>
  validatePassword(password) ? validatePassword(password) : dispatch(msg)
