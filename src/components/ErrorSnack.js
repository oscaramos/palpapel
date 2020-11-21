import { useError } from "../hooks/useError"
import React, { useEffect, useState } from "react"
import Snackbar from "@material-ui/core/Snackbar"
import Alert from "@material-ui/lab/Alert"

export function ErrorSnack() {
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
