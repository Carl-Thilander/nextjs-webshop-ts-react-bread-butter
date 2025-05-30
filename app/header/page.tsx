"use client";

import {
  AdminPanelSettings as AdminIcon,
  Login as LoginIcon,
  Logout as LogoutIcon,
  Menu as MenuIcon,
  PersonAdd as PersonAddIcon,
  Person as PersonIcon,
} from "@mui/icons-material";
import {
  AppBar,
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Tooltip,
  Typography,
  alpha,
  useMediaQuery,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartIconButton from "./cart-icon-button";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);

  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  const confirmSignOut = () => {
    setLogoutDialogOpen(false);
    signOut({ callbackUrl: "/" });
  };


  const drawerItems = [
    !session && {
      text: "Sign In",
      href: "/auth/signin",
      icon: <LoginIcon />,
    },
    !session && {
      text: "Register",
      href: "/auth/register",
      icon: <PersonAddIcon />,
    },
    session &&
    !session.user?.isAdmin && {
      text: "My Orders",
      href: "/orders",
      icon: <PersonIcon sx={{color: "#61371E"}} />,
    },
    session && {
      text: "Sign Out",
      href: "#",
      icon: <LogoutIcon sx={{color: "#61371E"}} />,
      onClick: () => {
        setDrawerOpen(false);
        setLogoutDialogOpen(true);
      },
    },
    session?.user?.isAdmin && {
      text: "Admin",
      href: "/admin",
      icon: <AdminIcon color="primary" />,
    },
  ].filter(Boolean);

  return (
    <>
      <AppBar
        position="sticky"
        sx={{
          padding: { xs: 1, sm: 2 },
          bgcolor: "background.default",
          zIndex: 1100,
          height: { xs: 70, sm: 80, md: 90 },
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

          <Box sx={{ flexGrow: 1 }} />

          {/* Desktop Actions */}
          <Box
            sx={{
              display: { xs: "none", sm: "flex" },
              alignItems: "center",
              gap: 2,
            }}
          >
            {!session && (
              <>
                <Button
                  component={Link}
                  href="/auth/signin"
                  startIcon={<LoginIcon />}
                  sx={{
                    color: "text.primary",
                    "&:hover": { bgcolor: alpha("#000", 0.04) },
                  }}
                >
                  Sign in
                </Button>
                <Button
                  component={Link}
                  href="/auth/register"
                  variant="outlined"
                  startIcon={<PersonAddIcon />}
                  sx={{ borderColor: "divider", color: "text.primary" }}
                >
                  Register
                </Button>
              </>
            )}
            {session && (
              <>
                {session.user?.isAdmin && (
                  <Button
                    component={Link}
                    href="/admin"
                    startIcon={<AdminIcon />}
                    sx={{
                      color: "text.primary",
                      "&:hover": { bgcolor: alpha("#000", 0.04) },
                    }}
                  >
                    Admin
                  </Button>
                )}

                {/* User Icon - only for non-admin users */}
                {session && !session.user?.isAdmin && (
                  <Tooltip title="My Orders">
                    <IconButton
                      component={Link}
                      href="/orders"
                      aria-label="my orders"
                      sx={{
                        color: "text.primary",
                        "&:hover": { bgcolor: alpha("#000", 0.04) },
                      }}
                    >
                      <PersonIcon fontSize="large" />
                    </IconButton>
                  </Tooltip>
                )}

                <Button
                  onClick={() => setLogoutDialogOpen(true)}
                  startIcon={<LogoutIcon />}
                  sx={{
                    color: "text.primary",
                    bgcolor: "background.paper",
                    "&:hover": { bgcolor: alpha("#000", 0.04) },
                  }}
                >
                  Sign out
                </Button>
              </>
            )}
            <CartIconButton />
          </Box>

          {/* Mobile Menu */}
          {isSmallScreen && (
            <IconButton
              onClick={toggleDrawer}
              edge="end"
              sx={{ color: "text.primary", ml: 1 }}
            >
              <MenuIcon />
            </IconButton>
          )}
        </Toolbar>
      </AppBar>

      <Drawer
        anchor="right"
        open={drawerOpen}
        onClose={toggleDrawer}
        PaperProps={{
          sx: {
            width: 280,
            bgcolor: "background.paper",
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography
            variant="subtitle1"
            sx={{ px: 2, py: 1, fontWeight: 800 }}
          >
            Menu
          </Typography>
          <Divider sx={{ my: 1 }} />
          <List>
            {drawerItems.map(({ text, href, icon, onClick }: any) => (
              <ListItem
                key={text}
                component={href !== "#" ? Link : "button"}
                href={href !== "#" ? href : undefined}
                onClick={onClick || toggleDrawer}
                sx={{
                  borderRadius: 1,
                  color: "text.primary",
                  "&:hover": { bgcolor: "action.hover" },
                }}
              >
                <ListItemIcon sx={{ minWidth: 40, color: "black" }}>
                  {icon}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ my: 2 }} />
          <Box sx={{ px: 1.3 }}>
            <CartIconButton />
          </Box>
        </Box>
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog
        open={logoutDialogOpen}
        onClose={() => setLogoutDialogOpen(false)}
        aria-labelledby="logout-dialog-title"
      >
        <DialogTitle id="logout-dialog-title">Confirm Sign Out</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Are you sure you want to sign out of your account?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setLogoutDialogOpen(false)} color="inherit">
            Cancel
          </Button>
          <Button onClick={confirmSignOut} color="error" variant="contained">
            Sign out
          </Button>
        </DialogActions>
      </Dialog>

    </>
  );
};

export default Header;
