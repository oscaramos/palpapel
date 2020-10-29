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
  MenuItem,
} from '@material-ui/core'
import Skeleton from '@material-ui/lab/Skeleton'

import SearchIcon from '@material-ui/icons/Search'
import MenuIcon from '@material-ui/icons/Menu'

import OrderCard from '../components/OrderCard'
import { useOrders } from '../hooks/useOrders'
import { useError } from '../hooks/useError'

import { auth, firestore } from '../firebase.utils'

function MyOrders({ orders, loading, error }) {
  const { throwError } = useError()

  useEffect(() => {
    if (error) {
      throwError('Error loading my orders')
    }
  }, [error])

  return (
    <Grid item>
      <Typography variant='h2'>
        My orders
      </Typography>

      <Grid container direction='column' spacing={1} style={ { marginTop: '0.5rem', marginBottom: '0.5rem' } }>
        {
          orders?.map(order => (
            <Grid item key={ order.id }>
              <OrderCard
                id={order.id}
                responsableName={order.responsableName}
                orderNumber={order.orderNumber}
                orderDate={order.orderDisplayDate}
              />
            </Grid>
          ))
        }
        {
          loading &&
            <Skeleton variant="rect" width="100%" height={118} animation="wave"/>
        }
      </Grid>

      <Button variant='outlined' fullWidth>
        See More
      </Button>
    </Grid>
  )
}

function SharedWithMe() {
  return (
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
  )
}

function Operations() {
  const [, setLocation] = useLocation()
  const { getAllOrders: [orders, loading, error] } = useOrders()
  const [createdOrderId, setCreatedOrderId] = useState(null)

  const handleCreateOrder = async () => {
    const res = await firestore.collection('orders').add({
      orderDate: new Date(),
      orderNumber: "",
      schoolName: "",
      schoolAddress: "",
      schoolRUC: "",
      schoolTelephone: "",
      schoolCellphone: "",
      responsableName: "",
      responsablePosition: "",
      responsableEmail: "",
    })
    setCreatedOrderId(res.id)
  }

  useEffect(() => {
    if (!loading && !error && createdOrderId) {
      const order = orders.find(order => order.firebaseId === createdOrderId)
      setLocation(`/edit/${order.id}`);
    }
  }, [loading, error, createdOrderId])

  return (
    <Grid container direction='column' style={ { marginTop: '1rem' } }>
      <MyOrders
        orders={orders}
        loading={loading}
        error={error}
      />
      <SharedWithMe />

      <Grid item>
        <Button variant='contained' color='primary' fullWidth onClick={handleCreateOrder}>
          Create New Order
        </Button>
      </Grid>
    </Grid>
  )
}


function Home() {
  const [, setLocation] = useLocation()
  const [user, loading] = useAuthState(auth)

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

  useEffect(() => {
    if (!user && !loading) {
      setLocation('/login');
    }
  }, [user, loading, setLocation])

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

      <Operations />
    </Container>
  )
}

export default Home
