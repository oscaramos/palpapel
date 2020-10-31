import { red } from "@material-ui/core/colors"
import { createMuiTheme } from "@material-ui/core/styles"

const arcBlue = "#0B72B9"
const arcGrey = "#868686"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    common: {
      arcBlue,
      arcGrey,
    },
    primary: {
      main: arcBlue,
    },
    error: {
      main: red.A400,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: "2em",
      fontWeight: "bold",
    },
    h2: {
      fontSize: "1.75em",
      fontWeight: "bold",
    },
  },
})

export default theme
