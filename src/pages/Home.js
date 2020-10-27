import React from 'react'
import { Link } from 'wouter'

import {
  AppBar,
  Grid,
  Container,
  Button,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'

import OrderCard from '../components/OrderCard'
import { useOrders } from '../hooks/useOrders'
import { toDDMMYYYY } from '../utils'


function Home() {
  const [orders] = useOrders()

  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={ { border: 'none', backgroundColor: 'white' } }>
        <Toolbar style={ { color: 'black' } } disableGutters>
          <Grid container direction='row' justify='center'>
            <Grid item style={ { width: '100%' } }>
              <Link href='/search'>
                <TextField
                  variant='outlined'
                  placeholder='Search'
                  InputProps={ {
                    startAdornment: <InputAdornment><SearchIcon
                      style={ { opacity: '0.4', marginRight: 10 } } /></InputAdornment>,
                  } }
                  fullWidth
                />
              </Link>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container direction='column' style={ { marginTop: '1rem' } }>
        <Grid item>
          <Typography variant='h2'>
            My orders
          </Typography>

          <Grid container direction='column' spacing={1} style={ { marginTop: '0.5rem', marginBottom: '0.5rem' } }>
            {
              orders.map(order => (
                <Grid item key={ order.id }>
                  <OrderCard
                    id={order.id}
                    responsableName={order.responsableName}
                    orderNumber={order.orderNumber}
                    orderDate={toDDMMYYYY(order.orderDate)}
                  />
                </Grid>
              ))
            }

          </Grid>

          <Button variant='outlined' fullWidth>
            See More
          </Button>
        </Grid>

        <Grid item style={ { marginTop: '1rem', marginBottom: '2rem' } }>
          <Typography variant='h2'>
            Shared With Me
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

          <Button variant='outlined' fullWidth>
            See More
          </Button>
        </Grid>

        <Grid item>
          <Link href='/edit'>
            <Button variant='contained' color='primary' fullWidth>
              Create New Order
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
