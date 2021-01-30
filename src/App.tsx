import React from "react"
import Layout from "./components/layout"
import Routes from "./components/routes"

interface Foo {
  bob: string
  lol: string
}

function App() {
  console.log("")
  return (
    <Layout>
      <Routes />
    </Layout>
  )
}

export default App
