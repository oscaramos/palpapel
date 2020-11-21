import React from "react"
import { Link } from "wouter"

import { Container, Grid, Typography, Button, Link as MuiLink } from "@material-ui/core"

import { ReactComponent as Logo } from "../assets/logo.svg"
import { ReactComponent as DocumentsIllustration } from "../assets/documents_illustration.svg"

function Splash() {
  return (
    <Container maxWidth="xs">
      <Grid container direction="column" alignItems="center" style={{ marginTop: 64 }} spacing={1}>
        <Grid item>
          <DocumentsIllustration />
        </Grid>
        <Grid item>
          <Logo height="56" width="auto" />
        </Grid>
        <Grid item>
          <Typography variant="body_lg">Documentos directos pal papel</Typography>
        </Grid>
        <Grid item container style={{ marginTop: 48 }}>
          <Link href="/register">
            <Button variant="contained" fullWidth>
              Registrarse
            </Button>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="body_reg" style={{ marginRight: 4 }}>
            ¿Ya tiene una cuenta?
          </Typography>
          <Link href="/login">
            <MuiLink>Iniciar Sesión</MuiLink>
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Splash
