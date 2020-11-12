import React, { useEffect, useState } from "react"

import { Container, Grid, IconButton, TextField, Typography } from "@material-ui/core"

import { ChevronLeft as ArrowLeftIcon } from "react-feather"

import DocumentCard from "../components/DocumentCard"
import { useGetAllDocuments } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"
import Navbar from "../components/Navbar"
import { makeStyles } from "@material-ui/core/styles"
import { Link } from "wouter"

const useNavbarStyles = makeStyles(() => ({
  inputPlaceholder: {
    "&::placeholder": {
      textOverflow: "ellipsis !important",
      color: "white",
      opacity: 0.6,
    },
  },
  textInput: {
    color: "white",
  },
}))

function SearchNavbar({ search, setSearch }) {
  const classes = useNavbarStyles()

  return (
    <Navbar>
      <Grid container direction="row" alignItems="center">
        <Grid item>
          <Link href="/">
            <IconButton>
              <ArrowLeftIcon color="white" size={24} />
            </IconButton>
          </Link>
        </Grid>
        <Grid item style={{ flexGrow: 1 }}>
          <TextField
            placeholder="Buscar"
            InputProps={{
              classes: {
                input: classes.inputPlaceholder,
              },
              className: classes.textInput,
            }}
            fullWidth
          />
        </Grid>
      </Grid>
    </Navbar>
  )
}

function Search() {
  const [documents, loading, error] = useGetAllDocuments()
  const { throwError } = useError()

  const [search, setSearch] = useState("")

  useEffect(() => {
    if (error) {
      throwError("Error loading my orders")
    }
  }, [error, throwError])

  const filteredDocuments = documents?.filter((document) => document.orderNumber.startsWith(search))

  return (
    <Container maxWidth="sm">
      <SearchNavbar search={search} setSearch={setSearch} />

      <Grid container direction="column">
        <Grid item>
          <Typography variant="h3">Resultados</Typography>

          <div style={{ marginTop: 16 }}>
            {filteredDocuments?.map((document) => (
              <Grid item key={document.id}>
                <DocumentCard
                  id={document.id}
                  number={document.orderNumber}
                  date={document.orderDisplayDate}
                />
              </Grid>
            ))}
          </div>
        </Grid>
      </Grid>
    </Container>
  )
}

export default Search
