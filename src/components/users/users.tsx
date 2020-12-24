import React, { useEffect, useState } from "react"

const Users = () => {
  const [state, setState] = useState<Record<string, string>[] | null>(null)

  useEffect(() => {
    const getData = async () => {
      const res = await fetch("https://jsonplaceholder.typicode.com/users")
      const data = await res.json()
      setState(data)
    }
    getData()
  }, [])

  return (
    <div>
      {state !== null ? (
        state.map(d => (
          <p key={d.name}>
            {d.name} {d.email}{" "}
          </p>
        ))
      ) : (
        <div>...loading</div>
      )}
    </div>
  )
}

export default Users
