import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"

import { IconButton, Typography, Container, Chip, Button, Grid } from "@material-ui/core"
import { X as CloseIcon } from "react-feather"
import { makeStyles } from "@material-ui/core/styles"

import Navbar from "../components/Navbar"
import { useUserData } from "../hooks/useDocuments"
import { editUserDataFilters } from "../utils/user.firebase"

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

function Pill({ selected, children, ...rest }) {
  const classes = useStyles()
  if (selected) {
    return <Chip label={children} className={classes.selectedChip} clickable={false} {...rest} />
  }
  return <Chip label={children} className={classes.unselectedChip} clickable={false} {...rest} />
}

function FilterWithData({ filterData, onEdit, clickedEdit }) {
  const [groupBy, setGroupBy] = useState(filterData.groupBy)
  const [orderBy, setOrderBy] = useState(filterData.orderBy)

  useEffect(() => {
    if (clickedEdit) {
      onEdit({
        groupBy,
        orderBy,
      })
    }
  }, [clickedEdit])

  return (
    <Grid container direction="column" spacing={6}>
      <Grid item container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h3">Agrupar por</Typography>
        </Grid>
        <Grid item container direction="row" spacing={1}>
          <Grid item>
            <Pill selected={groupBy === "schoolName"} onClick={() => setGroupBy("schoolName")}>
              Colegio
            </Pill>
          </Grid>
          <Grid item>
            <Pill selected={groupBy === "responsable"} onClick={() => setGroupBy("responsable")}>
              Responsable
            </Pill>
          </Grid>
          <Grid item>
            <Pill selected={groupBy === "displayDate"} onClick={() => setGroupBy("displayDate")}>
              Fecha
            </Pill>
          </Grid>
        </Grid>
      </Grid>

      <Grid item container direction="column" spacing={3}>
        <Grid item>
          <Typography variant="h3">Ordenar por</Typography>
        </Grid>
        <Grid item container direction="row" spacing={1}>
          <Grid item>
            <Pill selected={orderBy === "asc"} onClick={() => setOrderBy("asc")}>
              Ascendente
            </Pill>
          </Grid>
          <Grid item>
            <Pill selected={orderBy === "desc"} onClick={() => setOrderBy("desc")}>
              Descendente
            </Pill>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  )
}

function Filter() {
  const [, setLocation] = useLocation()
  const [userData, loading, error] = useUserData()
  const [clickedEdit, setClickedEdit] = useState(false)

  const handleEdit = (data) => {
    editUserDataFilters(data)
    setLocation("/")
  }

  return (
    <Container maxWidth="xs">
      <FilterNavbar />

      {loading ? (
        "cargando..."
      ) : error ? (
        "error!"
      ) : (
        <FilterWithData
          filterData={userData.filters}
          onEdit={handleEdit}
          clickedEdit={clickedEdit}
        />
      )}

      <Button
        variant="contained"
        style={{ marginTop: 48 }}
        onClick={() => setClickedEdit(true)}
        fullWidth
      >
        Mostrar resultados
      </Button>
    </Container>
  )
}

export default Filter
