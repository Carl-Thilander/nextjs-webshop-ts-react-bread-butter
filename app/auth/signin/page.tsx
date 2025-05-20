"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import {
  Button,
  Container,
  Typography,
  Box,
  Paper,
  Alert,
  CircularProgress,
} from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";
import { useState } from "react";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const error = searchParams?.get("error");
  const [isLoading, setIsLoading] = useState(false);

  const handleSignIn = async () => {
    setIsLoading(true);
    await signIn("google", { callbackUrl });
  };

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
          <Typography variant="h4" component="h1" gutterBottom>
            Sign in
          </Typography>

          <Typography variant="body1" align="center">
            You need to sign in to continue.
          </Typography>

          {error && (
            <Alert severity="error" sx={{ width: "100%" }}>
              {error === "OAuthSignin"
                ? "Det gick inte att starta inloggningen."
                : error === "OAuthCallback"
                ? "Det gick inte att slutföra inloggningen."
                : error === "OAuthAccountNotLinked"
                ? "E-postadressen är redan kopplad till ett annat konto."
                : "Ett fel uppstod vid inloggningen. Försök igen."}
            </Alert>
          )}

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={
              isLoading ? (
                <CircularProgress size={20} color="inherit" />
              ) : (
                <GoogleIcon />
              )
            }
            onClick={handleSignIn}
            disabled={isLoading}
            sx={{
              py: 1.5,
              mt: 2,
              backgroundColor: "#4285F4",
              "&:hover": { backgroundColor: "#3367D6" },
            }}
          >
            Logga in med Google
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
