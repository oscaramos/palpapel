import React from "react"
import * as yup from "yup"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button, Container, Grid, Link as MuiLink, TextField, Typography } from "@material-ui/core"

import CloserNavbar from "../components/CloserNavbar"
import { useError } from "../hooks/useError"
import { useAuth } from "../hooks/useAuth"

import { ReactComponent as Logo } from "../assets/logo.svg"

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, "Las contraseña tiene que tener al menos 8 caracteres"),
})

function Login() {
  const [, setLocation] = useLocation()
  const { login } = useAuth()

  const { register, errors, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })
  const { throwError } = useError()

  const loginUser = async (data) => {
    try {
      await login(data.email, data.password)
      setLocation("/")
    } catch (error) {
      if (error.code === "auth/user-not-found" || error.code === "auth/wrong-password") {
        throwError("El correo o la contraseña están mal")
      } else if (error.code === "auth/too-many-requests") {
        throwError("Demasiados intentos, espere un rato")
      } else {
        throwError(error.message)
      }
    }
  }

  return (
    <Container maxWidth="xs">
      <CloserNavbar href="/splash" title="Iniciar Sesión" />

      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Logo />
        </Grid>

        <Grid item>
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
              disabled={!formState.isValid}
            >
              Iniciar Sesión
            </Button>
          </form>
        </Grid>

        <Grid item container direction="row" alignItems="baseline">
          <Grid item>
            <Typography variant="body_reg">¿Todavía no tiene cuenta?</Typography>
          </Grid>
          <Grid item style={{ marginLeft: 4 }}>
            <Link href="/register">
              <MuiLink>Registrarse</MuiLink>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Login
