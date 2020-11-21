import React, { useState } from "react"
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

import Navbar from "../components/Navbar"
import DocumentsRows from "../components/DocumentsRows"

import useFilters, { groupByToSpanish } from "../hooks/useFilters"
import { useGetGroupedDocuments } from "../hooks/useDocuments"
import { useAuth } from "../hooks/useAuth"
import { createDocument } from "../utils/documents.firebase"

import { ReactComponent as DocumentsIllustration } from "../assets/documents_illustration.svg"

function GroupedDocuments({ title, documents, groupBy, limit }) {
  // take the first x documents
  // if limit is undefined then take all documents
  const limitedDocuments = documents.slice(0, limit)

  const href = `/seeGroup/${title}?groupBy=${groupBy}`

  return (
    <div>
      {/*-- Mini header --*/}
      <Grid item container direction="row" justifyContent="space-between" style={{ marginTop: 32 }}>
        <Grid item>
          <Typography variant="h5">{title}</Typography>
        </Grid>
        <Grid item>
          <Link href={href}>
            <Typography variant="link_sm">Ver todos</Typography>
          </Link>
        </Grid>
      </Grid>

      {/*-- Documents Rows --*/}
      <DocumentsRows documents={limitedDocuments} />
      <div style={{ marginTop: 8, width: "100%", display: "flex", justifyContent: "center" }}>
        <Link href={href}>
          <Typography variant="link_sm">
            {documents.length > limit ? `Ver los ${documents.length} documentos` : null}
          </Typography>
        </Link>
      </div>
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

function Documents() {
  const classes = useDocumentsStyles()

  const filters = useFilters()
  const { groupBy } = filters

  const documentGroups = useGetGroupedDocuments(filters)

  // When there are not any document
  if (documentGroups.length === 0) {
    return (
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <DocumentsIllustration />
        </Grid>
        <Grid item>
          <Typography variant="body_lg">Es tiempo de crear un nuevo documento</Typography>
        </Grid>
      </Grid>
    )
  }

  return (
    <div>
      {/*-- Filter Navbar --*/}
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Typography variant="h3">{groupByToSpanish(filters.groupBy)}</Typography>
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
        {documentGroups.map((documents) => (
          <Grid item key={documents.title}>
            <GroupedDocuments
              title={documents.title}
              documents={documents.data}
              groupBy={groupBy}
              limit={5}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  )
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

function HomeNavbar() {
  const classes = useNavbarStyles()

  const [anchorEl, setAnchorEl] = useState(null)
  const [, setLocation] = useLocation()
  const { logout } = useAuth()

  const handleCreateDocument = async () => {
    const res = await createDocument()
    setLocation(`/document/${res.id}`)
  }

  const handleClickSignOut = async () => {
    await logout()
    setLocation("/splash")
  }

  const handleOpenMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleCloseMenu = () => {
    setAnchorEl(null)
  }

  return (
    <Navbar>
      {/*-- Navbar --*/}
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
          <IconButton onClick={handleCreateDocument}>
            <PlusCircleIcon color="white" size={24} />
          </IconButton>
          <IconButton onClick={handleOpenMenu}>
            <MenuIcon color="white" fontSize="large" />
          </IconButton>
        </Grid>
      </Grid>

      {/*-- Menu --*/}
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        keepMounted
      >
        <MenuItem onClick={handleClickSignOut}>Cerrar sesión</MenuItem>
      </Menu>
    </Navbar>
  )
}

function Home() {
  return (
    <Container maxWidth="sm">
      <HomeNavbar />
      <Documents />
    </Container>
  )
}

export default Home
