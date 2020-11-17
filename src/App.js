import React, { useEffect, useState } from "react"
import { Redirect, Route as WouterRoute, Switch } from "wouter"

import Home from "./pages/Home"
import Document from "./pages/Document"
import Search from "./pages/Search"
import Login from "./pages/Login"
import Register from "./pages/Register"
import Splash from "./pages/Splash"
import Filter from "./pages/Filter"
import NotFound from "./pages/NotFound"
import SeeGroup from "./pages/SeeGroup"

import Alert from "@material-ui/lab/Alert"
import Snackbar from "@material-ui/core/Snackbar"

import { ErrorProvider, useError } from "./hooks/useError"
import { useAuthState } from "react-firebase-hooks/auth"
import { auth } from "./firebase.utils"

function ErrorPopup() {
  const { message } = useError()
  const [errorSnack, setErrorSnack] = useState({
    open: false,
    message: "",
  })

  useEffect(() => {
    if (message) {
      setErrorSnack({
        open: true,
        message,
      })
    }
  }, [message])

  const handleCloseSnack = (event, reason) => {
    if (reason === "clickaway") {
      return
    }

    setErrorSnack({ open: false, message: "" })
  }

  return (
    <Snackbar open={errorSnack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
      <Alert elevation={6} variant="filled" severity="error">
        {errorSnack.message}
      </Alert>
    </Snackbar>
  )
}

// unauthenticated users will go to /splash
function Route({ authOnly, loginOnly, ...rest }) {
  const [user, loading] = useAuthState(auth)

  if (loading) {
    return "cargando..."
  }

  if (!user && authOnly) {
    return <Redirect to="/splash" />
  }

  if (user && loginOnly) {
    return <Redirect to="/" />
  }

  return <WouterRoute {...rest} />
}

function App() {
  return (
    <ErrorProvider>
      <Switch>
        <Route authOnly path="/" component={Home} />
        <Route authOnly path="/search" component={Search} />
        <Route authOnly path="/filter" component={Filter} />
        <Route authOnly path="/seeGroup/:title" component={SeeGroup} />
        <Route authOnly path="/document/:id" component={Document} />

        <Route loginOnly path="/splash" component={Splash} />
        <Route loginOnly path="/login" component={Login} />
        <Route loginOnly path="/register" component={Register} />

        <Route component={NotFound} />
      </Switch>
      <ErrorPopup />
    </ErrorProvider>
  )
}

export default App
