import React, { useEffect } from "react"
import * as yup from "yup"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { useAuthState } from "react-firebase-hooks/auth"
import { yupResolver } from "@hookform/resolvers/yup"

import {
  Container,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
  Typography,
  IconButton,
} from "@material-ui/core"

import { X as CloseIcon } from "react-feather"

import { auth } from "../firebase.utils"
import { useError } from "../hooks/useError"
import Navbar from "../components/Navbar"

import { ReactComponent as Logo } from "../assets/logo.svg"

function LoginNavbar() {
  return (
    <Navbar maxWidth="xs">
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item style={{ position: "absolute", alignSelf: "flex-start" }}>
          <IconButton>
            <Link href="/splash">
              <CloseIcon color="white" size={24} />
            </Link>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">Iniciar Sesión</Typography>
        </Grid>
      </Grid>
    </Navbar>
  )
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, "password should be at least 8 characters"),
})

function Login() {
  const [, setLocation] = useLocation()
  const [user, loading] = useAuthState(auth)
  const { register, errors, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
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

  console.log(errors)

  return (
    <Container maxWidth="xs">
      <LoginNavbar />

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
