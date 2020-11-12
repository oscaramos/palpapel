import { createMuiTheme } from "@material-ui/core/styles"

const blue = "#020887"
const red = "#ED474A"
const green = "#8ACB88"

const gray20 = "#F8F7FA"
const gray40 = "#CBCBD4"
const gray60 = "#A6A6AA"
const gray80 = "#3A3A3A"
const gray100 = "#000000"

// A custom theme for this app
const theme = createMuiTheme({
  palette: {
    common: {
      blue,
      red,
      green,
      gray20,
      gray40,
      gray60,
      gray80,
      gray100,
    },
    primary: {
      main: blue,
    },
    background: {
      default: "#fff",
    },
  },
  typography: {
    h1: {
      fontSize: 40,
      lineHeight: "40px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
    h2: {
      fontSize: 32,
      lineHeight: "36px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
    h3: {
      fontSize: 28,
      lineHeight: "32px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
    h4: {
      fontSize: 20,
      lineHeight: "24px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
    h5: {
      fontSize: 16,
      lineHeight: "20px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
    h6: {
      fontSize: 12,
      lineHeight: "12px",
      fontWeight: 700,
      fontFamily: "lato, sans-serif",
    },
  },
  overrides: {
    MuiInput: {
      input: {
        "&::placeholder": {
          color: "gray",
        },
        color: "white", // if you also want to change the color of the input, this is the prop you'd use
      },
    },
  },
  components: {
    MuiTypography: {
      variants: [
        {
          props: { variant: "link_sm" },
          style: {
            fontSize: 12,
            lineHeight: "16px",
            fontWeight: 700,
            fontFamily: "lato, sans-serif",
            textDecoration: "underline",
            color: gray60,
            cursor: "pointer",
          },
        },
        {
          props: { variant: "body_lg" },
          style: {
            fontSize: 20,
            lineHeight: "24px",
            fontWeight: 400,
            fontFamily: "lato, sans-serif",
          },
        },
        {
          props: { variant: "body_reg" },
          style: {
            fontSize: 16,
            lineHeight: "20px",
            fontWeight: 400,
            fontFamily: "lato, sans-serif",
          },
        },
      ],
    },
    MuiButton: {
      styleOverrides: {
        // Name of the rule
        contained: {
          borderRadius: 16,
          height: 48,
        },
      },
    },
  },
})

export default theme
