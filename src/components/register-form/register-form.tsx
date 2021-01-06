import * as React from "react"
import { cx, css } from "@emotion/css"
import styled from "@emotion/styled"
import { setNestedObjectValues } from "../../utils/setNestedObjectValues"

const StyledError = styled.p`
  color: var(--textColor);
  border-radius: var(--border-radius);
  background-color: var(--red-shadow);
  padding: 0.3em;
  width: 60%;
  margin: 0.2em 0;
  box-shadow: var(--shadowXl);
`
const ErrorMessage = ({ msg }: { msg: string }) => {
  return <StyledError> {msg} </StyledError>
}

interface State {
  values: Record<string, any>
  errors: Record<string, any>
  touched: Record<string, any>
  isSubmitting: boolean
}

type FormValue<T> = {
  [key: string]: T
}

type Action =
  | { type: "SET_FIELD_VALUE"; payload: FormValue<string> }
  | { type: "FORM_SUBMIT" }
  | { type: "SET_FILED_TOUCHED"; payload: FormValue<boolean> }
  | { type: "SET_ERRORS"; payload: FormValue<string> }
  | { type: "SUBMIT_ATTEMPT" }
  | { type: "SUBMIT_SUCCESS" }
  | { type: "SUBMIT_FAILURE"; payload: string }

function reducer(state: State, action: Action) {
  switch (action.type) {
    case "SET_ERRORS":
      return {
        ...state,
        errors: action.payload,
      }
    case "SET_FIELD_VALUE":
      return {
        ...state,
        values: {
          ...state.values,
          ...action.payload,
        },
      }
    case "SUBMIT_ATTEMPT":
      return {
        ...state,
        isSubmitting: true,
        touched: setNestedObjectValues(state.values, true),
      }
    case "SUBMIT_SUCCESS":
      return {
        ...state,
        values: {},
        isSubmitting: false,
      }
    case "SUBMIT_FAILURE":
      return {
        ...state,
        isSubmitting: false,
        errors: { submitError: action.payload },
      }
    case "SET_FILED_TOUCHED":
      return {
        ...state,
        touched: {
          ...state.touched,
          ...action.payload,
        },
      }
    default:
      return state
  }
}

interface UseFormProps {
  initialValues: Record<string, string>
  onSubmit: (values: Record<string, string>) => void
  validate?: (values: Record<string, string>) => Record<string, string>
}

const useForm = ({ initialValues, onSubmit, validate }: UseFormProps) => {
  if (!onSubmit) {
    throw new Error("Please pass in onSubmit to use form")
  }
  const [formState, dispatch] = React.useReducer(reducer, {
    values: initialValues,
    errors: {},
    touched: {},
    isSubmitting: false,
  })

  React.useEffect(() => {
    if (validate) {
      const errors = validate(formState.values)
      dispatch({ type: "SET_ERRORS", payload: errors })
    }
  }, [formState.values, validate])

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const { name, value } = event.target
    dispatch({ type: "SET_FIELD_VALUE", payload: { [name]: value } })
  }

  const handleBlur = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.persist()
    const { name } = event.target
    dispatch({ type: "SET_FILED_TOUCHED", payload: { [name]: true } })
  }

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    dispatch({ type: "SUBMIT_ATTEMPT" })
    if (!Object.keys(formState.errors).length) {
      try {
        await onSubmit(formState.values)
        dispatch({ type: "SUBMIT_SUCCESS" })
      } catch (submitError) {
        dispatch({ type: "SUBMIT_FAILURE", payload: submitError })
      }
    } else {
      const errors = validate ? validate(formState.errors) : {}
      dispatch({ type: "SET_ERRORS", payload: errors })
      dispatch({ type: "SUBMIT_FAILURE", payload: "oooops" })
    }
  }

  return { handleChange, handleBlur, handleSubmit, ...formState }
}

const formStyles = () => {
  return css`
    display: flex;
    justify-content: center;
    align-items: center;
    flex-flow: column wrap;
    max-width: 35rem;
    margin: 2rem auto;
    label {
      padding: 1rem 0.5rem;
      width: 100%;
    }
    input {
      width: 100%;
      outline: 0;
      border-radius: var(--border-radius);
      padding: 0.6em 0.8em;
      box-shadow: var(--shadowXl);
    }
  `
}

const sleep = (ms: number) => new Promise(r => setTimeout(r, ms))

export const RegisterForm = () => {
  const { handleSubmit, handleChange, handleBlur, values, touched, errors, isSubmitting } = useForm(
    {
      initialValues: { name: "", email: "", password: "", password2: "" },
      onSubmit: async values => {
        await sleep(1200)
        alert(JSON.stringify(values, null, 4))
      },
      validate: React.useCallback(values => {
        const emailRe = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
        let errors: Record<string, string> = {}

        if (values.name && values.name.length <= 3) {
          errors.name = "name must be longer then 3 chars"
        }
        if (!emailRe.test(values.email)) {
          errors.email = "not a valid email"
        }
        if (values.password && values.password.length < 5) {
          errors.password = "is way to short!"
        }
        if (values.password !== values.password2) {
          errors.password = "password does not match!"
        }
        return errors
      }, []),
    }
  )

  const { name, email, password, password2 } = values

  return (
    <form className={cx(formStyles())} onSubmit={handleSubmit}>
      {errors.submitError && <h3>{errors.submitError}</h3>}
      <label htmlFor="name">
        <input
          type="text"
          id="name"
          name="name"
          placeholder="name"
          value={name}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.name && touched.name && <ErrorMessage msg={errors.name} />}
      </label>
      <label htmlFor="email">
        <input
          type="email"
          id="email"
          name="email"
          placeholder="email"
          value={email}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.email && touched.email && <ErrorMessage msg={errors.email} />}
      </label>
      <label htmlFor="password">
        <input
          type="password"
          id="password"
          name="password"
          placeholder="password"
          value={password}
          onChange={handleChange}
          onBlur={handleBlur}
        />
        {errors.password && touched.password && <ErrorMessage msg={errors.password} />}
      </label>
      <label htmlFor="password2">
        <input
          type="password"
          id="password2"
          name="password2"
          placeholder="repeat password"
          value={password2}
          onChange={handleChange}
          onBlur={handleBlur}
        />

        {errors.password2 && touched.password2 && <ErrorMessage msg={errors.password2} />}
      </label>

      <button disabled={isSubmitting} type="submit">
        Register
      </button>
    </form>
  )
}
