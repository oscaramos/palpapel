import React, { useEffect } from "react"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { useAuthState } from "react-firebase-hooks/auth"
import * as yup from "yup"
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
import Navbar from "../components/Navbar"

import { ReactComponent as Logo } from "../assets/logo.svg"

function RegisterNavbar() {
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
          <Typography variant="h5">Registrarse</Typography>
        </Grid>
      </Grid>
    </Navbar>
  )
}

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, "password should be at least 8 characters"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords does not match")
    .required(),
})

function Register() {
  const [, setLocation] = useLocation()
  const { register, errors, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })
  const [user] = useAuthState(auth)

  const registerUser = (data) => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
  }

  useEffect(() => {
    if (user) {
      setLocation("/")
    }
  }, [user, setLocation])

  return (
    <Container maxWidth="xs">
      <RegisterNavbar />

      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Logo />
        </Grid>

        <Grid item>
          <form onSubmit={handleSubmit(registerUser)}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Correo Electrónico"
              name="email"
              inputRef={register}
              autoComplete="email"
              error={Boolean(errors.email)}
              helperText={errors?.email?.message}
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Contraseña"
              type="password"
              name="password"
              inputRef={register}
              autoComplete="current-password"
              error={Boolean(errors.password)}
              helperText={errors?.password?.message}
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Confirmar Contraseña"
              name="confirmPassword"
              inputRef={register}
              type="password"
              error={Boolean(errors.confirmPassword)}
              helperText={errors?.confirmPassword?.message}
              fullWidth
            />
            <Button
              type="submit"
              variant="contained"
              color="primary"
              style={{ marginTop: "1rem", marginBottom: "0.5rem" }}
              disabled={!formState.isValid}
              fullWidth
            >
              Registrarse
            </Button>
          </form>
        </Grid>

        <Grid item container direction="row" alignItems="baseline">
          <Grid item>
            <Typography variant="body_reg">¿Ya tiene una cuenta?</Typography>
          </Grid>
          <Grid item style={{ marginLeft: 4 }}>
            <Link href="/login">
              <MuiLink>Iniciar Sesión</MuiLink>
            </Link>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
