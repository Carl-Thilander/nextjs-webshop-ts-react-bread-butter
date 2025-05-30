"use client";

import { useSearchParams } from "next/navigation";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import Link from "next/link";
import { Suspense } from "react";

function ErrorContent() {
  const searchParams = useSearchParams();
  const error = searchParams?.get("error") || "Unknown error";

  return (
    <Container maxWidth="sm" sx={{ pt: 8 }}>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: 3,
          }}
        >
          <Typography variant="h4" component="h1" gutterBottom color="error">
            Authentication Error
          </Typography>{" "}
          <Typography variant="body1" align="center">
            {error === "AccessDenied"
              ? "You don't have permission to access this resource."
              : error === "Verification"
              ? "The sign in link is no longer valid. It may have been used already or it may have expired."
              : error === "Configuration"
              ? "There is a problem with the server configuration. If this issue persists, please contact support."
              : error === "CredentialsSignin"
              ? "The email or password you entered is incorrect. Please try again."
              : error === "OAuthSignin" ||
                error === "OAuthCallback" ||
                error === "OAuthCreateAccount"
              ? "There was a problem with the OAuth authentication."
              : error === "EmailCreateAccount" || error === "Callback"
              ? "There was a problem signing you in."
              : error === "OAuthAccountNotLinked"
              ? "This email is already associated with another account."
              : error === "SessionRequired"
              ? "You need to be signed in to access this page."
              : "There was a problem with your authentication. Please try again."}
          </Typography>
          <Button variant="contained" component={Link} href="/" sx={{ mt: 2 }}>
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default function ErrorPage() {
  return (
    <Suspense
      fallback={
        <Container maxWidth="sm" sx={{ pt: 8 }}>
          <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 3,
              }}
            >
              <Typography
                variant="h4"
                component="h1"
                gutterBottom
                color="error"
              >
                Authentication Error
              </Typography>
              <Typography variant="body1" align="center">
                Loading...
              </Typography>
            </Box>
          </Paper>
        </Container>
      }
    >
      <ErrorContent />
    </Suspense>
  );
}
