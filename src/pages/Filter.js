import React, { useEffect, useState } from "react"
import { useLocation } from "wouter"

import { Button, Chip, Container, Grid, Typography } from "@material-ui/core"
import { makeStyles } from "@material-ui/core/styles"

import useFilters from "../hooks/useFilters"
import CloserNavbar from "../components/CloserNavbar"
import { editUserDataFilters } from "../utils/user.firebase"

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
  }, [clickedEdit, onEdit, groupBy, orderBy])

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
  const [filters, loading, error] = useFilters()
  const [clickedEdit, setClickedEdit] = useState(false)

  const handleEdit = (data) => {
    editUserDataFilters(data)
    setLocation("/")
  }

  return (
    <Container maxWidth="xs">
      <CloserNavbar href="/" title="Filtros" />

      {loading ? (
        "cargando..."
      ) : error ? (
        "error!"
      ) : (
        <FilterWithData filterData={filters} onEdit={handleEdit} clickedEdit={clickedEdit} />
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
