import React from "react"
import Container from "@material-ui/core/Container"
import { ReactComponent as Logo } from "../assets/logo.svg"
import Grid from "@material-ui/core/Grid"
import Typography from "@material-ui/core/Typography"
import { ReactComponent as DocumentsIllustration } from "../assets/documents_illustration.svg"
import Button from "@material-ui/core/Button"
import { Link as MuiLink } from "@material-ui/core"
import { Link } from "wouter"

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
