"use client";
import { createTheme } from "@mui/material";

const theme = createTheme({
  typography: {
    h2: {
      fontFamily: "var(--font-poppins)",
    },
    h1: {
      fontSize: 32,
      fontFamily: "var(--font-montserrat)",
    },
  },
  palette: {
    primary: {
      main: "#D0E3B2",
    },
    secondary: {
      main: "#BCE784",
    },
    success: {
      main: "#52B788",
    },
    error: {
      main: "#ff5252",
    },
    background: {
      default: "#FAFAFA",
      paper: "#F6F5F3",
    },
    text: {
      primary: "#61371E",
      secondary: "#0a0a0a",
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
