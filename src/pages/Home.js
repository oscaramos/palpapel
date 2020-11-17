import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"

import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Menu,
  MenuItem,
  TextField,
  Typography,
} from "@material-ui/core"

import {
  Filter as FilterIcon,
  Menu as MenuIcon,
  PlusCircle as PlusCircleIcon,
  Search as SearchIcon,
} from "react-feather"

import DocumentCard from "../components/DocumentCard"
import Navbar from "../components/Navbar"

import { useGetGroupedDocuments, useUserData } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"

import { auth } from "../firebase.utils"
import { createDocument } from "../utils/documents.firebase"

function GroupedDocuments({ title, documents, loading }) {
  return (
    <Grid item container direction="row" justifyContent="space-between" style={{ marginTop: 32 }}>
      {/*-- Mini header --*/}
      <Grid item>
        <Typography variant="h5">{title}</Typography>
      </Grid>
      <Grid item>
        <Typography variant="link_sm">Ver todos</Typography>
      </Grid>

      {/*-- Documents --*/}
      <Grid container direction="column" style={{ paddingTop: 12 }}>
        {documents?.map((doc) => (
          <Grid item key={doc.id}>
            <DocumentCard id={doc.id} number={doc.number} date={doc.displayDate} />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

const useDocumentsStyles = makeStyles((theme) => ({
  filterButton: {
    color: theme.palette.common.gray80,
    border: `1px solid ${theme.palette.common.gray80}`,
    borderRadius: 50,
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 24,
    paddingRight: 24,
  },
  filterButtonText: {
    color: theme.palette.common.gray80,
  },
}))

function DocumentsWithFilters({ filters }) {
  const classes = useDocumentsStyles()
  const [documentGroups, loading, error] = useGetGroupedDocuments(filters)

  const { throwError } = useError()

  useEffect(() => {
    if (error) {
      throwError("Error cargando mis ordenes")
    }
  }, [error, throwError])

  return (
    <div>
      {/*-- Filter Navbar --*/}
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3">Colegio</Typography>
        </Grid>
        <Grid item>
          <Link href="/filter">
            <Button
              startIcon={<FilterIcon size={16} color="black" />}
              variant="outlined"
              className={classes.filterButton}
            >
              <Typography variant="body_reg" className={classes.filterButtonText}>
                Filtros
              </Typography>
            </Button>
          </Link>
        </Grid>
      </Grid>

      {/*-- Grouped Documents list --*/}
      <Grid container direction="column" spacing={6}>
        {documentGroups?.map((documents) => (
          <Grid item>
            <GroupedDocuments
              title={documents.title}
              documents={documents.data}
              loading={loading}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
}

function Documents() {
  const [userData, loading, error] = useUserData()

  if (error) return "error"
  if (loading) return "cargando..."

  return <DocumentsWithFilters filters={userData.filters} />
}

const useNavbarStyles = makeStyles(() => ({
  inputPlaceholder: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white",
      opacity: 0.6,
    },
  },
}))

function HomeNavbar({ onOpenMenu, onCreateDocument }) {
  const classes = useNavbarStyles()

  return (
    <Navbar>
      <Grid container direction="row" alignItems="center">
        <Grid item style={{ flexGrow: 1 }}>
          <Link href="/search">
            <TextField
              placeholder="Buscar"
              InputProps={{
                startAdornment: (
                  <InputAdornment>
                    <SearchIcon style={{ marginRight: 10, color: "white" }} />
                  </InputAdornment>
                ),
                classes: {
                  input: classes.inputPlaceholder,
                },
              }}
              fullWidth
            />
          </Link>
        </Grid>
        <Grid item style={{ marginLeft: "0.5rem", marginRight: "0.5rem" }}>
          <IconButton onClick={onCreateDocument}>
            <PlusCircleIcon color="white" size={24} />
          </IconButton>
          <IconButton onClick={onOpenMenu}>
            <MenuIcon color="white" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>
    </Navbar>
  )
}

function Home() {
  const [, setLocation] = useLocation()

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCreateDocument = async () => {
    const res = await createDocument()
    setLocation(`/document/${res.id}`)
  }

  return (
    <Container maxWidth="sm">
      <HomeNavbar onOpenMenu={handleOpenMenu} onCreateDocument={handleCreateDocument} />
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
      >
        <MenuItem
          onClick={() => {
            auth.signOut()
            handleCloseMenu()
          }}
        >
          Cerrar sesión
        </MenuItem>
      </Menu>

      <Documents />
    </Container>
  )
}

export default Home
