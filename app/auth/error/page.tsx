"use client";

import { useSearchParams } from "next/navigation";
import { Container, Typography, Box, Paper, Button } from "@mui/material";
import Link from "next/link";

export default function ErrorPage() {
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
          </Typography>

          <Typography variant="body1" align="center">
            {error === "AccessDenied"
              ? "You don't have permission to access this page."
              : "There was a problem signing you in."}
          </Typography>

          <Button variant="contained" component={Link} href="/" sx={{ mt: 2 }}>
            Return to Home
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
