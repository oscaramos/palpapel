import React, { useEffect } from "react"
import queryString from "query-string"
import { useLocation } from "wouter"

import { Container, Typography } from "@material-ui/core"
import CloserNavbar from "../components/CloserNavbar"
import DocumentsRows from "../components/DocumentsRows"

import { useGetGroupedDocuments } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"

function SeeGroup({ params }) {
  const { title: encodedTitle } = params
  const title = decodeURI(encodedTitle)
  const { groupBy } = queryString.parse(window.location.search)

  const [, setLocation] = useLocation()
  const [documentGroups, , error] = useGetGroupedDocuments({
    groupBy: groupBy,
  })

  const { throwError } = useError()

  useEffect(() => {
    if (error) {
      throwError(error.message)
      setLocation("/")
    }
  }, [error, throwError, setLocation])

  const group = documentGroups?.find((group) => group.title === title)

  if (documentGroups && !group) {
    throwError("Titulo no valido")
    setLocation("/")
  }

  return (
    <Container maxWidth="xs">
      <CloserNavbar href="/" title="Ver todo" />

      <Typography variant="h3">{title}</Typography>
      <DocumentsRows documents={group?.data} />
    </Container>
  )
}

export default SeeGroup
