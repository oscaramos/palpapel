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


function Register() {
  const { register, handleSubmit } = useForm()

  const registerUser = data => {
    console.log(data)
  }

  return (
    <Container maxWidth='xs'>
      <Typography variant='h1' align='center' style={{ marginTop: '4rem' }}>
        Register
      </Typography>
      <form onSubmit={handleSubmit(registerUser)}>

        <TextField
          variant="outlined"
          margin="normal"
          label="Name"
          autoComplete="name"
          name='name'
          inputRef={register}
          fullWidth
          autoFocus
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Email Address"
          name='email'
          inputRef={register}
          autoComplete="email"
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
          fullWidth
        />
        <TextField
          variant="outlined"
          margin="normal"
          label="Confirm Password"
          name='confirmPassword'
          inputRef={register}
          type="password"
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
