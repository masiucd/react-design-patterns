import React from "react"
import { Route, Switch } from "react-router-dom"

const StartPage = React.lazy(() => import("../pages/start"))
const MemoizationPage = React.lazy(() => import("../pages/memo"))
const ContactPage = React.lazy(() => import("../pages/contact"))
const FaqPage = React.lazy(() => import("../pages/faq"))
const LoginPage = React.lazy(() => import("../pages/login"))
const GamePage = React.lazy(() => import("../pages/game"))
const RegisterPage = React.lazy(() => import("../pages/register"))
const PokemonPage = React.lazy(() => import("../pages/pokemon"))

const Routes = () => {
  return (
    <React.Suspense fallback={<div>...error</div>}>
      <Switch>
        <Route exact path="/" component={StartPage} />
        <Route exact path="/memo" component={MemoizationPage} />
        <Route exact path="/contact" component={ContactPage} />
        <Route exact path="/login" component={LoginPage} />
        <Route exact path="/faq" component={FaqPage} />
        <Route exact path="/game" component={GamePage} />
        <Route exact path="/register" component={RegisterPage} />
        <Route exact path="/pokemon" component={PokemonPage} />
      </Switch>
    </React.Suspense>
  )
}

export default Routes
