import React from "react"
import { Link } from "wouter"

import { makeStyles } from "@material-ui/core/styles"
import { Typography, Grid } from "@material-ui/core"

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    paddingTop: 12,
    paddingBottom: 12,
    borderTop: `1px solid ${theme.palette.common.gray40}`,
    borderBottom: `1px solid ${theme.palette.common.gray40}`,
  },
}))

function DocumentCard({ id, number, date }) {
  const classes = useStyles()

  return (
    <div className={classes.container}>
      <Grid container direction="row" justifyContent="space-between">
        <Grid item>
          <Link to={`/document/${id}/`}>
            <Typography variant="body_reg" style={{ cursor: "pointer" }}>
              Nº {number}
            </Typography>
          </Link>
        </Grid>
        <Grid item>
          <Typography variant="body_reg">{date}</Typography>
        </Grid>
      </Grid>
    </div>
  )
}

export default DocumentCard
