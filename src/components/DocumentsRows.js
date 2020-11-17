import React from "react"
import { Grid } from "@material-ui/core"
import DocumentCard from "./DocumentCard"

function DocumentsRows({ documents }) {
  return (
    <Grid container direction="column" style={{ paddingTop: 12 }}>
      {documents?.map((doc) => (
        <Grid item key={doc.id}>
          <DocumentCard id={doc.id} number={doc.number} date={doc.displayDate} />
        </Grid>
      ))}
    </Grid>
  )
}

export default DocumentsRows
