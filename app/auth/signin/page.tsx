"use client";

import { signIn } from "next-auth/react";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { Button, Container, Typography, Box, Paper } from "@mui/material";
import GoogleIcon from "@mui/icons-material/Google";

export default function SignIn() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";

  // Auto-redirect to Google sign-in
  useEffect(() => {
    // We can optionally auto-redirect if needed
    // signIn("google", { callbackUrl });
  }, [callbackUrl]);

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
            Logga in
          </Typography>

          <Typography variant="body1" align="center">
            Du behöver logga in för att fortsätta.
          </Typography>

          <Button
            variant="contained"
            size="large"
            fullWidth
            startIcon={<GoogleIcon />}
            onClick={() => signIn("google", { callbackUrl })}
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
