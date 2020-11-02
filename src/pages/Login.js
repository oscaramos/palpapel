import React, { useEffect } from "react"
import * as yup from "yup"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { useAuthState } from "react-firebase-hooks/auth"
import { yupResolver } from "@hookform/resolvers/yup"

import { Container, TextField, Button, Link as MuiLink, Grid, Typography } from "@material-ui/core"
import { auth } from "../firebase.utils"
import { useError } from "../hooks/useError"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, "password should be at least 8 characters"),
})

function Login() {
  const [, setLocation] = useLocation()
  const [user, loading] = useAuthState(auth)
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  })
  const { throwError } = useError()

  const loginUser = (data) => {
    auth.signInWithEmailAndPassword(data.email, data.password).catch((error) => {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        throwError("The email address or password are wrong")
      } else if (error.code === "auth/too-many-requests") {
        throwError("Too many attempts")
      } else {
        throwError("Unknown error")
      }
    })
  }

  useEffect(() => {
    if (user && !loading) {
      setLocation("/")
    }
  }, [user, loading, setLocation])

  return (
    <Container maxWidth="xs">
      <Typography variant="h1" align="center" style={{ marginTop: "4rem" }}>
        Iniciar Sesión
      </Typography>
      <form onSubmit={handleSubmit(loginUser)}>
        <TextField
          variant="outlined"
          margin="normal"
          label="Correo Electrónico"
          name="email"
          inputRef={register}
          error={Boolean(errors.email)}
          helperText={errors?.email?.message}
          fullWidth
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Contraseña"
          type="password"
          name="password"
          inputRef={register}
          error={Boolean(errors.password)}
          helperText={errors?.password?.message}
          fullWidth
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
        >
          Iniciar Sesión
        </Button>
      </form>
      <Grid container direction="row" justify="center">
        <Grid item>
          <Link href="/register">
            <MuiLink>Registrarse</MuiLink>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
