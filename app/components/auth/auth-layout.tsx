"use client";

import { Box, Typography } from "@mui/material";
import { ReactNode } from "react";

interface AuthLayoutProps {
  children: ReactNode;
  title: string;
  subtitle: string;
}

export const AuthLayout = ({ children, title, subtitle }: AuthLayoutProps) => {
  return (
    <Box
      sx={{
        display: "flex",
        minHeight: "90vh",
        backgroundColor: "background.default",
        color: "text.primary",
      }}
    >
      {/* Form Section */}
      <Box
        sx={{
          flex: 1,
          minWidth: { md: "50%" },
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          p: 4,
          borderRight: { md: "none" },
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: 500,
            textAlign: "center",
          }}
        >
          <Box sx={{ mb: 4 }}>
            <Typography
              variant="h3"
              component="h1"
              sx={{
                fontWeight: 700,
                mb: 1,
                letterSpacing: "-0.025em",
              }}
            >
              {title}
            </Typography>
            <Typography
              variant="body1"
              sx={{
                color: "text.secondary",
                fontSize: "0.875rem",
              }}
            >
              {subtitle}
            </Typography>
          </Box>
          {children}
        </Box>
      </Box>

      {/* Image Section */}
      <Box
        sx={{
          flex: 1,
          display: { xs: "none", md: "block" },
          height: "90vh",
          backgroundImage:
            "linear-gradient(to bottom right, rgba(79, 70, 229, 0.1), rgba(99, 102, 241, 0.1)), url(/images/auth-image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          position: "relative",

          overflow: "hidden",
          "&::before": {
            content: '""',
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background:
              "linear-gradient(45deg, rgba(9, 9, 11, 0.7) 0%, rgba(9, 9, 11, 0.3) 100%)",
          },
        }}
      ></Box>
    </Box>
  );
};
