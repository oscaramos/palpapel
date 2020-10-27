import React from 'react'
import { Link } from 'wouter'

import {
  Grid,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Container,
  Button,
  TextField
} from '@material-ui/core'

import ArrowBackIcon from '@material-ui/icons/ArrowBack'


function Edit() {
  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={ {
        backgroundColor: 'white',
        borderBottom: '2px solid rgba(0, 0, 0, 0.12)',
        borderLeft: 'none',
        borderRight: 'none',
        borderTop: 'none',
      } }>
        <Toolbar disableGutters style={ { color: 'black' } }>
          <Link href="/">
            <IconButton style={ { position: 'absolute' } }>
              <ArrowBackIcon />
            </IconButton>
          </Link>
          <Grid container direction='row' justify='center'>
            <Grid item>
              <Typography variant='h5' align='center'>
                Create Order
              </Typography>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid
        container
        direction='column'
        style={ { marginTop: '1rem', marginBottom: '1rem' } }
      >
        {/*-- Order --*/}
        <Grid
          item
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing='1'
        >
          <Grid item>
            <Typography variant='h2'>
              Order
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Order Number'
              placeholder='000104'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Date'
              placeholder='01/01/2020'
              fullWidth
            />
          </Grid>
        </Grid>

        {/*-- School --*/}
        <Grid
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing='1'
        >
          <Grid item>
            <Typography variant='h2'>
              School
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Name'
              placeholder='Colegio de las rosas'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Address'
              placeholder='2972 Westheimer Rd. Santa Ana, Illinois 85486'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='RUC'
              placeholder='20601888221'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Telephone Number'
              placeholder='(704) 555-0127'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Cellphone Number'
              placeholder='(704) 555-0120'
              fullWidth
            />
          </Grid>
        </Grid>

      {/*-- Responsable --*/}
        <Grid
          container
          direction='column'
          style={ { marginTop: '1rem', marginBottom: '1rem' } }
          spacing='1'
        >
          <Grid item>
            <Typography variant='h2'>
              Responsable
            </Typography>
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Name'
              placeholder='Bessie Cooper'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Position'
              placeholder='Teacher'
              fullWidth
            />
          </Grid>
          <Grid item>
            <TextField
              variant='outlined'
              label='Email'
              placeholder='betsie@example.com'
              fullWidth
            />
          </Grid>
        </Grid>
      </Grid>

      <Grid container direction='column'>
        <Grid item>
          <Link href="/order">
            <Button variant='contained' color='primary' fullWidth>
              Save
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Edit
