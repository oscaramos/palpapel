import React from "react"
import queryString from "query-string"
import { useLocation } from "wouter"

import { Container, Typography } from "@material-ui/core"
import CloserNavbar from "../components/CloserNavbar"
import DocumentsRows from "../components/DocumentsRows"

import { useGetGroupedDocuments } from "../hooks/useDocuments"
import { useError } from "../hooks/useError"

const getQueryStringArguments = () => queryString.parse(window.location.search)

function SeeGroup({ params }) {
  const { title: encodedTitle } = params
  const title = decodeURI(encodedTitle)

  const { groupBy } = getQueryStringArguments()

  const [, setLocation] = useLocation()

  const documentGroups = useGetGroupedDocuments({
    groupBy: groupBy,
  })

  const { throwError } = useError()

  const group = documentGroups.find((group) => group.title === title)

  if (!group) {
    throwError("Titulo no valido")
    setLocation("/")
  }

  return (
    <Container maxWidth="xs">
      <CloserNavbar href="/" title="Ver todo" />
      <Typography variant="h3">{title}</Typography>
      <DocumentsRows documents={group.data} />
    </Container>
  )
}

export default SeeGroup
