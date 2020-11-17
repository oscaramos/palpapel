import React from "react"
import Navbar from "./Navbar"
import { Grid, IconButton, Typography } from "@material-ui/core"
import { Link } from "wouter"
import { X as CloseIcon } from "react-feather"

function CloserNavbar({ href, title }) {
  return (
    <Navbar maxWidth="xs">
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item style={{ position: "absolute", alignSelf: "flex-start" }}>
          <IconButton>
            <Link href={href}>
              <CloseIcon color="white" size={24} />
            </Link>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
      </Grid>
    </Navbar>
  )
}

export default CloserNavbar
