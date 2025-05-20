"use client";

import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import Link from "next/link";
import CartIconButton from "./cart-icon-button";
import SignInButton from "../components/SignInButton";

const Header = () => {
  return (
    <AppBar
      position="sticky"
      sx={{
        padding: { xs: 1, sm: 2 },
        bgcolor: "background.default",
        zIndex: 1100,
      }}
    >
      <Toolbar>
        <Typography
          component={Link}
          href="/"
          sx={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            gap: 1,
            textDecoration: "none",
            textShadow: "3px 3px 6px rgba(255, 245, 203, 0.5)",
            color: "text.primary",
            fontSize: { xs: 20, sm: 25, md: 40 },
          }}
        >
          <Box
            component="img"
            src="/images/beanleaflogo.png"
            alt="Bean & Leaf logo"
            sx={{
              width: { xs: 40, sm: 60, md: 100 },
              height: { xs: 40, sm: 60, md: 100 },
              objectFit: "contain",
            }}
          />
          Bean & Leaf
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "flex-end",
            alignItems: "center",
            gap: 2,
          }}
        >
          <SignInButton />
          <IconButton color="inherit" component={Link} href="/admin">
            <AccountCircleIcon
              sx={{
                fontSize: { sx: 20, md: 40 },
                color: "text.primary",
              }}
            />
          </IconButton>
          <CartIconButton />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
