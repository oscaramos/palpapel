import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"
import { useAuthState } from "react-firebase-hooks/auth"

import {
  AppBar,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import Skeleton from "@material-ui/lab/Skeleton"

import SearchIcon from "@material-ui/icons/Search"
import MenuIcon from "@material-ui/icons/Menu"

import OrderCard from "../components/OrderCard"
import { useOrders } from "../hooks/useOrders"
import { useError } from "../hooks/useError"

import { auth } from "../firebase.utils"

function MyOrders({ orders, loading, error }) {
  const { throwError } = useError()

  useEffect(() => {
    if (error) {
      throwError("Error cargando mis ordenes")
    }
  }, [error, throwError])

  return (
    <Grid item>
      <Typography variant="h2">Mis Ordenes</Typography>

      <Grid
        container
        direction="column"
        spacing={1}
        style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}
      >
        {orders?.map((order) => (
          <Grid item key={order.id}>
            <OrderCard
              id={order.id}
              responsableName={order.responsableName}
              orderNumber={order.orderNumber}
              orderDate={order.orderDisplayDate}
            />
          </Grid>
        ))}
        {loading && (
          <Skeleton variant="rect" width="100%" height={118} animation="wave" />
        )}
      </Grid>
    </Grid>
  )
}

function SharedWithMe() {
  return (
    <Grid item style={{ marginTop: "1rem", marginBottom: "2rem" }}>
      {/*<Typography variant="h2">Shared With Me</Typography>*/}

      {/*<Grid*/}
      {/*  container*/}
      {/*  direction="column"*/}
      {/*  spacing={1}*/}
      {/*  style={{ marginTop: "0.5rem", marginBottom: "0.5rem" }}*/}
      {/*></Grid>*/}
    </Grid>
  )
}

function Operations() {
  const [, setLocation] = useLocation()
  const {
    getAllOrders: [orders, loading, error],
    createOrder,
  } = useOrders()

  const handleCreateOrder = async () => {
    const res = await createOrder()
    setLocation(`/edit/${res.id}`)
  }

  return (
    <Grid container direction="column">
      <MyOrders orders={orders} loading={loading} error={error} />

      <SharedWithMe />

      <Grid item>
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleCreateOrder}
        >
          Crear Nueva Orden
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
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const logoutUser = () => {
    auth.signOut()
  }

  useEffect(() => {
    if (!user && !loading) {
      setLocation("/login")
    }
  }, [user, loading, setLocation])

  return (
    <Container maxWidth="sm">
      <AppBar
        position="sticky"
        variant="outlined"
        style={{ border: "none", backgroundColor: "white" }}
      >
        <Toolbar style={{ color: "black" }} disableGutters>
          <Grid container direction="row" justify="center" alignItems="center">
            <Grid item style={{ flexGrow: 1 }}>
              <Link href="/search">
                <TextField
                  variant="outlined"
                  placeholder="Buscar"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment>
                        <SearchIcon
                          style={{ opacity: "0.4", marginRight: 10 }}
                        />
                      </InputAdornment>
                    ),
                  }}
                  fullWidth
                />
              </Link>
            </Grid>
            <Grid item style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
              <IconButton onClick={handleOpenMenu}>
                <MenuIcon fontSize="large" />
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
        <MenuItem
          onClick={() => {
            logoutUser()
            handleCloseMenu()
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>

      <Operations />
    </Container>
  )
}

export default Home
