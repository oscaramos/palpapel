import React, { useEffect, useState } from "react"
import { Link, useLocation } from "wouter"
import { useAuthState } from "react-firebase-hooks/auth"

import {
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  TextField,
  Typography,
  makeStyles,
} from "@material-ui/core"

import {
  PlusCircle as PlusCircleIcon,
  Menu as MenuIcon,
  Search as SearchIcon,
  Filter as FilterIcon,
} from "react-feather"

import DocumentCard from "../components/DocumentCard"
import Navbar from "../components/Navbar"

import { useGetAllDocuments } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"

import { auth } from "../firebase.utils"
import { createDocument } from "../utils/documents.firebase"

const useGroupedDocumentsStyles = makeStyles((theme) => ({
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

function GroupedDocuments({ documents, loading, error }) {
  const classes = useGroupedDocumentsStyles()
  const { throwError } = useError()

  useEffect(() => {
    if (error) {
      throwError("Error cargando mis ordenes")
    }
  }, [error, throwError])

  return (
    <div>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3">Colegio</Typography>
        </Grid>
        <Grid item>
          <Button
            startIcon={<FilterIcon size={16} color="black" />}
            variant="outlined"
            className={classes.filterButton}
          >
            <Typography variant="body_reg" className={classes.filterButtonText}>
              Filtros
            </Typography>
          </Button>
        </Grid>
      </Grid>

      <Grid container direction="column" spacing={8}>
        <Grid
          item
          container
          direction="row"
          justifyContent="space-between"
          style={{ marginTop: 32 }}
        >
          <Grid item>
            <Typography variant="h5">Alegría y Felicidad</Typography>
          </Grid>
          <Grid item>
            <Typography variant="link_sm">Ver todos</Typography>
          </Grid>
          <Grid container direction="column" style={{ paddingTop: 12 }}>
            {documents?.map((doc) => (
              <Grid item key={doc.id}>
                <DocumentCard id={doc.id} number={doc.orderNumber} date={doc.orderDisplayDate} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </div>
  )
}

function Documents() {
  const [documents, loading, error] = useGetAllDocuments()

  return <GroupedDocuments documents={documents} loading={loading} error={error} />
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
  const [user, loading] = useAuthState(auth)

  const [anchorEl, setAnchorEl] = useState(null)

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  const handleCreateDocument = async () => {
    const res = await createDocument()
    setLocation(`/edit/${res.id}`)
  }

  useEffect(() => {
    if (!user && !loading) {
      setLocation("/splash")
    }
  }, [user, loading, setLocation])

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
