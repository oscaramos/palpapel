import React from "react"
import { makeStyles } from "@material-ui/core/styles"
import { AppBar, Container, Toolbar } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  appbar: {
    border: "none",
    backgroundColor: theme.palette.primary,
  },
}))

function Navbar({ children, maxWidth = "sm" }) {
  const classes = useStyles()

  return (
    <>
      <AppBar position="fixed" variant="outlined" className={classes.appbar}>
        <Container maxWidth={maxWidth}>
          <Toolbar disableGutters>{children}</Toolbar>
        </Container>
      </AppBar>
      <div style={{ height: 96 }} />
    </>
  )
}

export default Navbar
