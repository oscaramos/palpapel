import React from "react"
import Container from "@material-ui/core/Container"
import Typography from "@material-ui/core/Typography"
import Button from "@material-ui/core/Button"
import { Link } from "wouter"
import Grid from "@material-ui/core/Grid"

function NotFound() {
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
          <Link href="/">
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
