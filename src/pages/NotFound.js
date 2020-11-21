import React from "react"
import { Link } from "wouter"

import { Typography, Container, Button, Grid } from "@material-ui/core"

import useUser from "../hooks/useUser"

function NotFound() {
  const user = useUser()

  const href = user ? "/" : "/splash"

  return (
    <Container maxWidth="xs">
      <Grid
        container
        direction="column"
        alignItems="center"
        justifyContent="center"
        style={{ height: "100vh", paddingBottom: "10vh" }}
      >
        <Grid item>
          <Typography variant="h3">¡Oh no!</Typography>
        </Grid>
        <Grid item style={{ marginTop: 8 }}>
          <Typography variant="body_lg">La página que busca no existe</Typography>
        </Grid>
        <Grid item container style={{ marginTop: 24 }}>
          <Link href={href}>
            <Button variant="contained" fullWidth>
              Volver a Casa
            </Button>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default NotFound
