import React from 'react'

import {
  AppBar,
  Grid,
  Container,
  Button,
  Typography,
  Toolbar,
  Card,
  CardContent,
  TextField,
  InputAdornment,
} from '@material-ui/core'

import SearchIcon from '@material-ui/icons/Search';

function OrderCard({ orderNumber, orderDate, responsableName}) {
  return (
    <Card style={{ width: '100%' }}>
      <CardContent style={{ padding: 12 }}>
        <Grid container direction='column'>
          <Grid item container direction='row' justify='space-between' alignItems='center'>
            <Grid item>
              <div style={{ fontSize: '1.4rem', fontWeight: 'bold' }}>
                Nº {orderNumber}
              </div>
            </Grid>
            <Grid item>
              <div style={{ fontSize: '0.9rem', fontWeight: 'normal' }}>
                {orderDate}
              </div>
            </Grid>
          </Grid>
          <Grid item>
            <div style={{ fontSize: '1.2rem' }}>
              {responsableName}
            </div>
          </Grid>
          <Grid item>
            <div style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>
              Total Items
            </div>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  )
}

function Home() {
  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={{ border: 'none', backgroundColor: 'white' }}>
        <Toolbar style={ { color: 'black' } } disableGutters>
          <Grid container direction='row' justify='center'>
            <Grid item style={{ width: '100%' }}>
              <TextField
                variant='outlined'
                placeholder='Search'
                InputProps={{
                  startAdornment: <InputAdornment><SearchIcon style={{ opacity: '0.4', marginRight: 10 }} /></InputAdornment>
                }}
                fullWidth
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container direction='column' style={ { marginTop: '1rem' } }>
        <Grid item>
          <Typography variant="h2">
            My orders
          </Typography>

          <Grid container direction='column' spacing='1' style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
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

          <Button variant="outlined" fullWidth>
            See More
          </Button>
        </Grid>

        <Grid item style={ { marginTop: '1rem', marginBottom: '2rem' } }>
          <Typography variant="h2">
            Shared With Me
          </Typography>

          <Grid container direction='column' spacing='1' style={{ marginTop: '0.5rem', marginBottom: '0.5rem' }}>
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

          <Button variant="outlined" fullWidth>
            See More
          </Button>
        </Grid>

        <Grid item>
          <Button variant='contained' color='primary' fullWidth>
            Create New Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
