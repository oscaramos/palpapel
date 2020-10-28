import React, { useEffect, useState } from 'react'
import * as yup from 'yup'
import { Link, useLocation } from 'wouter'
import { useForm } from 'react-hook-form'
import { useAuthState } from 'react-firebase-hooks/auth'
import { yupResolver } from '@hookform/resolvers/yup'

import {
  Container,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
  Typography
} from '@material-ui/core'
import { auth } from '../firebase.utils'
import Snackbar from '@material-ui/core/Snackbar'
import Alert from '@material-ui/lab/Alert'

const schema = yup.object().shape({
  email: yup.string().email().required(),
  password: yup.string().required().min(8, 'password should be at least 8 characters'),
});

function Login() {
  const [, setLocation] = useLocation()
  const [user, loading] = useAuthState(auth);
  const { register, errors, handleSubmit } = useForm({
    resolver: yupResolver(schema)
  })

  const [errorSnack, setErrorSnack] = useState({
    open: false,
    message: ''
  })

  const handleCloseSnack = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setErrorSnack({ open: false, message: '' });
  };

  const loginUser = data => {
    auth.signInWithEmailAndPassword(data.email, data.password)
      .catch(error => {
        if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password') {
          setErrorSnack({
            open: true,
            message: 'The email address or password are wrong'
          })
        } else if (error.code === 'auth/too-many-requests') {
          setErrorSnack({
            open: true,
            message: 'Too many attempts',
          })
        } else {
          setErrorSnack({
            open: true,
            message: 'Unknown error',
          })
        }
      })
  }

  useEffect(() => {
    if (user && !loading) {
      setLocation('/')
    }
  }, [user])

  return (
    <Container maxWidth='xs'>
      <Typography variant='h1' align='center' style={{ marginTop: '4rem' }}>
        Login
      </Typography>
      <form onSubmit={handleSubmit(loginUser)}>
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Email Address"
          autoFocus
          name='email'
          inputRef={register}
          error={Boolean(errors.email)}
          helperText={errors?.email?.message}
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          name='password'
          inputRef={register}
          error={Boolean(errors.password)}
          helperText={errors?.password?.message}
        />

        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          style={{ marginTop: '1rem', marginBottom: '0.5rem' }}
        >
          Log In
        </Button>
      </form>
      <Grid container direction="row" justify='center'>
        <Grid item>
          <Link href="/register">
            <MuiLink>
              Register
            </MuiLink>
          </Link>
        </Grid>
      </Grid>
      <Snackbar open={errorSnack.open} autoHideDuration={6000} onClose={handleCloseSnack}>
        <Alert elevation={6} variant="filled" severity="error">
          { errorSnack.message }
        </Alert>
      </Snackbar>
    </Container>
  )
}

export default Login
