import React from "react"
import { Route, Switch } from "react-router-dom"

const StartPage = React.lazy(() => import("../pages/start"))
const MemoizationPage = React.lazy(() => import("../pages/memo"))
const ContactPage = React.lazy(() => import("../pages/contact"))

const Routes = () => {
  return (
    <React.Suspense fallback={<div>...error</div>}>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/memo" component={MemoizationPage} />
        <Route exact path="/contact" component={ContactPage} />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
