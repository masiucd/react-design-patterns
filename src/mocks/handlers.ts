// src/mocks/handlers.js
import { rest } from "msw"

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

  rest.get("https://jsonplaceholder.typicode.com/users", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { name: "frank", username: "frankie" },
        { name: "tina", username: "tinis" },
        { name: "greg", username: "gregies" },
      ])
    )
  }),

  rest.get("https://jsonplaceholder.typicode.com/albums", (req, res, ctx) => {
    return res(
      ctx.status(200),
      ctx.json([
        { id: 1, title: "foo" },
        { id: 2, title: "bar" },
      ])
    )
  }),
]
