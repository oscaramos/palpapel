import React, { useEffect, useState } from "react"

import {
  AppBar,
  Container,
  Grid,
  InputAdornment,
  TextField,
  Toolbar,
  Typography,
} from "@material-ui/core"
import SearchIcon from "@material-ui/icons/Search"

import OrderCard from "../components/OrderCard"
import Skeleton from "@material-ui/lab/Skeleton"
import { useGetAllOrders } from "../hooks/useOrders"
import { useError } from "../hooks/useError"

function Search() {
  const [allOrders, loading, error] = useGetAllOrders()
  const { throwError } = useError()

  const [search, setSearch] = useState("")

  useEffect(() => {
    if (error) {
      throwError("Error loading my orders")
    }
  }, [error, throwError])

  const orders = allOrders?.filter((order) => order.orderNumber.startsWith(search))

  return (
    <Container maxWidth="xs">
      <AppBar
        position="sticky"
        variant="outlined"
        style={{ border: "none", backgroundColor: "white" }}
      >
        <Toolbar style={{ color: "black" }} disableGutters>
          <Grid container direction="row" justify="center">
            <Grid item style={{ flexGrow: 1 }}>
              <TextField
                variant="outlined"
                placeholder="Buscar"
                InputProps={{
                  startAdornment: (
                    <InputAdornment>
                      <SearchIcon style={{ opacity: "0.4", marginRight: 10 }} />
                    </InputAdornment>
                  ),
                }}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                fullWidth
              />
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>

      <Grid container direction="column" style={{ marginTop: "1rem" }}>
        <Grid item>
          <Typography variant="h2">Resultados</Typography>

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
            {loading && <Skeleton variant="rect" width="100%" height={118} animation="wave" />}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Search
