import { Reducer, useEffect, useReducer, useState } from "react"
import LoginForm from "./login-form"

interface LoginData {
  username: string
  password: string
}
interface State {
  status: "idle" | "pending" | "resolved" | "rejected"
  responseData: null | LoginData
  errorMessage: string | null
}

type Action = { type: "START" } | { type: "RESOLVE"; payload: LoginData } | { type: "REJECT" }

const loginReducer: Reducer<State, Action> = (state: State, action: Action) => {
  switch (action.type) {
    case "START":
      return {
        ...state,
        status: "pending",
        responseData: null,
        errorMessage: null,
      }
    case "RESOLVE":
      return {
        ...state,
        status: "resolved",
        responseData: action.payload,
        errorMessage: null,
      }

    case "REJECT":
      return {
        ...state,
        status: "rejected",
        errorMessage: "Opps ...Something went wrong!",
      }
    default:
      throw new Error(`Unsupported type`)
  }
}

function useFormSubmission<T>(endPoint: string, data: T) {
  const [state, dispatch] = useReducer(loginReducer, {
    status: "idle",
    responseData: null,
    errorMessage: null,
  })

  const fetchBody = data ? JSON.stringify(data) : null

  useEffect(() => {
    // if (fetchBody) {
    //   dispatch({ type: "START" })
    //   fetch(endPoint, {
    //     method: "POST",
    //     body: fetchBody,
    //     headers: {
    //       "content-type": "application/json",
    //     },
    //   }).then(async res => {
    //     const data = await res.json()
    //     if (res.ok) {
    //       dispatch({ type: "RESOLVE", payload: data })
    //     } else {
    //       dispatch({ type: "REJECT" })
    //     }
    //   })
    // }

    if (fetchBody) {
      Promise.resolve(fetchBody)
        .then(r => {
          const parsedResponse = JSON.parse(r)
          dispatch({ type: "RESOLVE", payload: parsedResponse })
        })
        .catch(err => {
          console.error(err)
          dispatch({ type: "REJECT" })
        })
    }
  }, [endPoint, fetchBody])

  return state
}

function LoginSubmission() {
  const [formData, setFormData] = useState<LoginData | null>(null)

  const { status, responseData, errorMessage } = useFormSubmission("/login", formData)
  return (
    <>
      {status === "resolved" ? (
        <div>
          <h3> Welcome {responseData?.username}</h3>
        </div>
      ) : (
        <LoginForm onSubmit={(data: LoginData) => setFormData(data)} />
      )}
      <div>
        {status === "pending" && <div>...Loading</div>}
        {status === "rejected" && (
          <div className="alert" style={{ color: "red" }}>
            {errorMessage}
          </div>
        )}
      </div>
    </>
  )
}

export default LoginSubmission
