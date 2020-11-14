import React from "react"
import Navbar from "../components/Navbar"
import Grid from "@material-ui/core/Grid"
import { IconButton, Typography } from "@material-ui/core"
import { Link } from "wouter"
import { X as CloseIcon } from "react-feather"
import Container from "@material-ui/core/Container"
import Chip from "@material-ui/core/Chip"
import makeStyles from "@material-ui/core/styles/makeStyles"

function FilterNavbar() {
  return (
    <Navbar maxWidth="xs">
      <Grid container direction="column" alignItems="center" justifyContent="center">
        <Grid item style={{ position: "absolute", alignSelf: "flex-start" }}>
          <IconButton>
            <Link href="/">
              <CloseIcon color="white" size={24} />
            </Link>
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h5">Filtros</Typography>
        </Grid>
      </Grid>
    </Navbar>
  )
}

const useStyles = makeStyles(() => ({
  selectedChip: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 100,
    cursor: "pointer",

    backgroundColor: "#3A3A3A",
    color: "white",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "lato, sans-serif",
  },
  unselectedChip: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 40,
    borderRadius: 100,
    cursor: "pointer",

    backgroundColor: "white",
    border: "1px solid #3A3A3A",
    fontSize: 16,
    fontWeight: 400,
    fontFamily: "lato, sans-serif",
  },
}))

function Pill({ selected, children }) {
  const classes = useStyles()
  if (selected) {
    return <Chip variant="contained" label={children} className={classes.selectedChip} />
  }
  return <Chip variant="contained" label={children} className={classes.unselectedChip} />
}

function Filter() {
  return (
    <Container maxWidth="xs">
      <FilterNavbar />

      <Grid container direction="column" spacing={6}>
        <Grid item container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h3">Agrupar por</Typography>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Pill selected>Colegio</Pill>
            </Grid>
            <Grid item>
              <Pill>Responsable</Pill>
            </Grid>
            <Grid item>
              <Pill>Fecha</Pill>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container direction="column" spacing={4}>
          <Grid item>
            <Typography variant="h3">Ordenar por</Typography>
          </Grid>
          <Grid item container direction="row" spacing={1}>
            <Grid item>
              <Pill selected>Ascendente</Pill>
            </Grid>
            <Grid item>
              <Pill>Descendente</Pill>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Filter
