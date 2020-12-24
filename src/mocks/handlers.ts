// src/mocks/handlers.js
import { setupWorker, rest } from "msw"

interface LoginBody {
  username: string
  password: string
}

export const handlers = [
  rest.post<LoginBody>("/login", (req, res, ctx) => {
    const { username, password } = req.body
    if (!username) {
      return res(ctx.status(400), ctx.json({ message: "username required" }))
    }
    if (!password) {
      return res(ctx.status(400), ctx.json({ message: "password required" }))
    }
    return res(ctx.status(200), ctx.json({ username, password }))
  }),
  rest.get("/user", (req, res, ctx) => {
    //
  }),
]

export const server = setupWorker(...handlers)
