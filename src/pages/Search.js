import React from 'react'

import {
  AppBar,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import OrderCard from '../components/OrderCard'

function Home() {
  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={ { border: 'none', backgroundColor: 'white' } }>
        <Toolbar style={ { color: 'black' } } disableGutters>
          <Grid container direction='row' justify='center'>
            <Grid item style={ { width: '100%' } }>
              <TextField
                variant='outlined'
                placeholder='Search'
                InputProps={ {
                  startAdornment: <InputAdornment><SearchIcon
                    style={ { opacity: '0.4', marginRight: 10 } } /></InputAdornment>,
                } }
                fullWidth
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container direction='column' style={ { marginTop: '1rem' } }>
        <Grid item>
          <Typography variant='h2'>
            Results
          </Typography>

          <Grid container direction='column' spacing={1} style={ { marginTop: '0.5rem', marginBottom: '0.5rem' } }>
            <Grid item>
              <OrderCard
                responsableName='Responsable Name'
                orderNumber='000104'
                orderDate='01/01/2020'
              />
            </Grid>
            <Grid item>
              <OrderCard
                responsableName='Responsable Name'
                orderNumber='000104'
                orderDate='01/01/2020'
              />
            </Grid>
            <Grid item>
              <OrderCard
                responsableName='Responsable Name'
                orderNumber='000104'
                orderDate='01/01/2020'
              />
            </Grid>
          </Grid>
        </Grid>

      </Grid>
    </Container>
  )
}

export default Home
