"use client";

import { registerUser } from "@/lib/actions/auth";
import {
  Alert,
  Box,
  Button,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "./auth-layout";

interface Props {
  fromCart?: boolean;
}

export default function RegisterForm({ fromCart }: Props) {
  const [error, setError] = useState("");
  const router = useRouter();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await registerUser(formData);

    if (res && "error" in res) {
      setError(res.error);
    } else {
      router.push("/auth/signin");
    }
  };

  return (
    <AuthLayout title="Create Account" subtitle="Get started with your account">
      <Box
        component="form"
        onSubmit={handleSubmit}
        sx={{
          width: "100%",
          maxWidth: 400,
          mx: "auto",
          mt: 2,
          "& .MuiTextField-root": {
            backgroundColor: "background.paper",
            borderRadius: 2,
            boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
            "& fieldset": { borderColor: "divider" },
          },
        }}
      >
        {fromCart && (
          <Alert severity="info" sx={{ mb: 3 }}>
            You need to be a registered user to checkout. Please register or log
            in.
          </Alert>
        )}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
          <TextField name="name" label="Name" fullWidth required />
          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            required
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            required
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              height: 40,
              backgroundColor: "primary.main",
              color: "text.primary",
              "&:hover": { backgroundColor: "primary.dark" },
            }}
          >
            Create Account
          </Button>
        </Box>

        <Divider sx={{ my: 3, color: "text.secondary" }} />

        <Typography
          variant="body2"
          sx={{
            textAlign: "center",
            color: "text.secondary",
          }}
        >
          Already have an account?{" "}
          <Typography
            component="span"
            sx={{
              color: "success.main",
              cursor: "pointer",
              "&:hover": { textDecoration: "underline" },
            }}
            onClick={() => router.push("/auth/signin")}
          >
            Sign in
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
