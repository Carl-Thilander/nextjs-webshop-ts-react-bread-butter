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
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  alpha,
  useMediaQuery,
  Tooltip,
} from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import CartIconButton from "./cart-icon-button";

const Header = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const isSmallScreen = useMediaQuery("(max-width:600px)");
  const { data: session } = useSession();
  const pathname = usePathname();

  const toggleDrawer = () => setDrawerOpen((prev) => !prev);

  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

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
        icon: <PersonIcon color="primary" />,
      },
    session && {
      text: "Sign Out",
      href: "#",
      icon: <LogoutIcon color="primary" />,
      onClick: () => signOut({ callbackUrl: "/" }),
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
        elevation={0}
        sx={{
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
          backdropFilter: "blur(8px)",
          zIndex: 1200,
        }}
      >
        <Toolbar sx={{ px: { xs: 2, sm: 4 }, py: 1 }}>
          {/* Brand */}
          <Typography
            component={Link}
            href="/"
            variant="h6"
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 1.5,
              textDecoration: "none",
              color: "text.primary",
              fontWeight: 700,
              letterSpacing: -0.5,
              "&:hover": { opacity: 0.8 },
            }}
          >
            <Box
              component="img"
              src="/images/beanleaflogo.png"
              alt="Bean & Leaf logo"
              sx={{
                width: { xs: 36, sm: 44 },
                height: { xs: 36, sm: 44 },
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
                  onClick={() => signOut({ callbackUrl: "/" })}
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
          <Box sx={{ px: 2 }}>
            <CartIconButton />
          </Box>
        </Box>
      </Drawer>
    </>
  );
};

export default Header;
