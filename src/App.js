import React from "react"
import { Route, Switch } from "wouter"

import useUser from "./hooks/useUser"

import Home from "./pages/Home"
import Document from "./pages/Document"
import Search from "./pages/Search"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Splash from "./pages/Splash"
import Filter from "./pages/Filter"
import SeeGroup from "./pages/SeeGroup"
import NotFound from "./pages/NotFound"

function AuthenticatedApp() {
  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/search" component={Search} />
      <Route path="/filter" component={Filter} />
      <Route path="/seeGroup/:title" component={SeeGroup} />
      <Route path="/document/:id" component={Document} />
      <Route component={NotFound} />
    </Switch>
  )
}

function UnauthenticatedApp() {
  return (
    <Switch>
      <Route path="/splash" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      <Route component={NotFound} />
    </Switch>
  )
}

function App() {
  const user = useUser()

  return user ? <AuthenticatedApp /> : <UnauthenticatedApp />
}

export default App
