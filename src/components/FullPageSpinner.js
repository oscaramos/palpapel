import React from "react"
import CircularProgress from "@material-ui/core/CircularProgress"
import Grid from "@material-ui/core/Grid"

function FullPageSpinner() {
  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      style={{ height: "100vh", width: "100vw" }}
    >
      <CircularProgress />
    </Grid>
  )
}

export default FullPageSpinner
