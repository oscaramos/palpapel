import React from 'react'
import { Link } from 'wouter'
import { useForm } from 'react-hook-form'

import {
  Container,
  TextField,
  Button,
  Link as MuiLink,
  Grid,
  Typography
} from '@material-ui/core'

function Login() {
  const { register, handleSubmit } = useForm()

  const loginUser = data => {
    console.log(data)
  }

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
        />
        <TextField
          variant="outlined"
          margin="normal"
          fullWidth
          label="Password"
          type="password"
          name='password'
          inputRef={register}
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
    </Container>
  )
}

export default Login
