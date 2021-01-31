import React from "react"
import Layout from "./components/layout"
import Routes from "./components/routes"
import { createClient, Provider } from "urql"

const client = createClient({
  url: process.env.REACT_APP_POKE_URL!,
})

function App() {
  return (
    <Provider value={client}>
      <Layout>
        <Routes />
      </Layout>
    </Provider>
  )
}

export default App
