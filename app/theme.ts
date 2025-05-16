"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h2: {
      fontFamily: "var(--font-roboto)",
    },
    h1: {
      fontSize: 32,
      fontFamily: "var(--font-lobster)",
    },
  },
  palette: {
    primary: {
      main: "#D0E3B2", // main buttons
    },
    secondary: {
      main: "#BCE784", // alternate buttons
    },
    success: {
      main: "#52B788", // third accentuating button color
    },

    background: {
      default: "#FAFAFA", // white-ish
      paper: "#F6F5F3", //beighe-ish
    },
    text: {
      primary: "#61371E", // the color for h1 etc
      secondary: "#0a0a0a", // for normal text, it's a very dark brown
    },
  },
  components: {
    MuiButtonBase: {
      styleOverrides: { root: { color: "white" } },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          h1: "h1",
        },
      },
    },
  },
});

export default theme;
