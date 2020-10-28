import React, { useEffect, useState } from 'react'
import { Link, useLocation } from 'wouter'
import { useAuthState } from 'react-firebase-hooks/auth'

import {
  AppBar,
  Grid,
  Container,
  Button,
  Typography,
  Toolbar,
  TextField,
  InputAdornment,
  IconButton,
  Menu,
  MenuItem
} from '@material-ui/core'
import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'

import OrderCard from '../components/OrderCard'
import { useOrders } from '../hooks/useOrders'
import { auth } from '../firebase.utils'
import { toDDMMYYYY } from '../utils'


function Home() {
  const { getAllOrders } = useOrders()
  const [user, loading] = useAuthState(auth)
  const orders = getAllOrders()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const logoutUser = () => {
    auth.signOut();
  }

  const [, setLocation] = useLocation()

  useEffect(() => {
    if (!user && !loading) {
      setLocation('/login');
    }
  }, [user, loading])

  return (
    <Container maxWidth='xs'>
      <AppBar position='sticky' variant='outlined' style={ { border: 'none', backgroundColor: 'white' } }>
        <Toolbar style={ { color: 'black' } } disableGutters>
          <Grid container direction='row' justify='center' alignItems='center'>
            <Grid item style={ { flexGrow: 1 } }>
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
            <Grid item style={ { marginLeft: '0.5rem', marginRight: '0.5rem' } }>
              <IconButton onClick={handleOpenMenu}>
                <MenuIcon fontSize='large' />
              </IconButton>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem onClick={ () => {logoutUser(); handleCloseMenu()} }>Logout</MenuItem>
      </Menu>

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
