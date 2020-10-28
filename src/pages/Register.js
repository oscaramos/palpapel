import React, { useEffect } from 'react'
import { Link, useLocation } from 'wouter'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'

import {
  Container,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
  Typography
} from '@material-ui/core'

import { auth } from '../firebase.utils'
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, 'password should be at least 8 characters'),
  confirmPassword: yup.string().oneOf([yup.ref('password')], 'Passwords does not match').required(),
});


function Register() {
  const [, setLocation] = useLocation()
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })
  const [user] = useAuthState(auth)

  const registerUser = data => {
    auth.createUserWithEmailAndPassword(data.email, data.password)
  }

  useEffect(() => {
    if (user) {
      setLocation('/')
    }
  }, [user])

  return (
    <Container maxWidth='xs'>
      <Typography variant='h1' align='center' style={{ marginTop: '4rem' }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(registerUser)}>
        <TextField
          variant="outlined"
          margin="normal"
          label="Email Address"
          name='email'
          inputRef={register}
          autoComplete="email"
          error={Boolean(errors.email)}
          helperText={errors?.email?.message}
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Password"
          type="password"
          name='password'
          inputRef={register}
          autoComplete="current-password"
          error={Boolean(errors.password)}
          helperText={errors?.password?.message}
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          name='confirmPassword'
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
          style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
          fullWidth
        >
          Register
        </Button>
      </form>
      <Grid container direction="row" justify='center'>
        <Grid item>
          <Link href="/login">
            <MuiLink>
              Log In
            </MuiLink>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Register
