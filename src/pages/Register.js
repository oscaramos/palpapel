import React from "react"
import * as yup from "yup"
import { Link, useLocation } from "wouter"
import { useForm } from "react-hook-form"
import { yupResolver } from "@hookform/resolvers/yup"

import { Button, Container, Grid, Link as MuiLink, TextField, Typography } from "@material-ui/core"

import CloserNavbar from "../components/CloserNavbar"
import { useAuth } from "../hooks/useAuth"
import { useError } from "../hooks/useError"

import { ReactComponent as Logo } from "../assets/logo.svg"

const schema = yup.object().shape({
  name: yup.string().required("El nombre es un campo requerido"),
  email: yup.string().email().required("El correo es un campo requerido"),
  password: yup
    .string()
    .required("La contraseña es requerida")
    .min(6, "Las contraseña tiene que tener al menos 6 caracteres"),
  confirmPassword: yup
    .string("La confirmación de contraseña es requerida")
    .oneOf([yup.ref("password")], "Las contraseña no son iguales")
    .required(),
})

function Register() {
  const [, setLocation] = useLocation()
  const { register: registerUser } = useAuth()

  const { register, errors, handleSubmit, formState } = useForm({
    resolver: yupResolver(schema),
    mode: "onChange",
  })

  const { throwError } = useError()

  const submitHandler = async (data) => {
    try {
      await registerUser(data.name, data.email, data.password)
      setLocation("/")
    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        throwError("El correo ya esta en uso en otra cuenta")
      } else if (error.code === "auth/too-many-requests") {
        throwError("Demasiados intentos, espere un rato")
      } else {
        throwError(error.message)
      }
    }
  }

  return (
    <Container maxWidth="xs">
      <CloserNavbar href="/splash" title="Registrarse" />

      <Grid container direction="column" alignItems="center" spacing={1}>
        <Grid item>
          <Logo />
        </Grid>

        <Grid item>
          <form onSubmit={handleSubmit(submitHandler)}>
            <TextField
              variant="outlined"
              margin="normal"
              label="Nombre"
              name="name"
              autoComplete="name"
              inputRef={register}
              error={Boolean(errors.name)}
              helperText={errors?.name?.message}
              fullWidth
            />
            <TextField
              variant="outlined"
              margin="normal"
              label="Correo Electrónico"
              name="email"
              autoComplete="email"
              inputRef={register}
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
              autoComplete="current-password"
              inputRef={register}
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
