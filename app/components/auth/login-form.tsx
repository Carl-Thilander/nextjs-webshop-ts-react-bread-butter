"use client";

import GoogleIcon from "@mui/icons-material/Google";
import {
  Alert,
  Box,
  Button,
  CircularProgress,
  Divider,
  TextField,
  Typography
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { AuthLayout } from "./auth-layout";

export default function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get("callbackUrl") || "/";
  const redirectError = searchParams?.get("error");

  const [formError, setFormError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleGoogleSignIn = async () => {
    setGoogleLoading(true);
    await signIn("google", { callbackUrl });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const res = await signIn("credentials", {
      redirect: false,
      email: formData.get("email"),
      password: formData.get("password"),
      callbackUrl,
    });

    if (res?.error) {
      setFormError("Invalid email or password");
    } else {
      router.push(res?.url || "/");
    }
  };

  return (
    <AuthLayout
      title="Welcome Back"
      subtitle="Sign in to continue"
    >
      <Box component="form" onSubmit={handleSubmit} sx={{
        width: '100%',
        '& .MuiTextField-root': {
          backgroundColor: 'background.paper',
          borderRadius: '8px',
          '& fieldset': { borderColor: 'divider' }
        }
      }}>
        {(redirectError || formError) && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {formError ||
              (redirectError === "OAuthSignin"
                ? "Failed to start sign in process."
                : redirectError === "OAuthCallback"
                  ? "Failed to complete sign in process."
                  : redirectError === "OAuthAccountNotLinked"
                    ? "Email is already linked to another account."
                    : "An error occurred during sign in. Please try again.")}
          </Alert>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
              backgroundColor: 'primary.main',
              color: 'common.white',
              '&:hover': { backgroundColor: 'primary.dark' }
            }}
          >
            Login with Email
          </Button>
        </Box>

        <Divider sx={{ my: 3, color: 'text.secondary' }}>Or continue with</Divider>

        <Button
          fullWidth
          variant="outlined"
          startIcon={
            googleLoading ? (
              <CircularProgress size={20} color="inherit" />
            ) : (
              <GoogleIcon />
            )
          }
          onClick={handleGoogleSignIn}
          disabled={googleLoading}
          sx={{
            height: 40,
            borderColor: 'divider',
            color: 'text.primary',
            '&:hover': {
              backgroundColor: 'action.hover',
              borderColor: 'divider'
            }
          }}
        >
          Google
        </Button>

        <Typography variant="body2" sx={{
          textAlign: 'center',
          mt: 3,
          color: 'text.secondary'
        }}>
          Don't have an account?{' '}
          <Typography
            component="span"
            sx={{
              color: 'primary.main',
              cursor: 'pointer',
              '&:hover': { textDecoration: 'underline' }
            }}
            onClick={() => router.push('/auth/register')}
          >
            Sign up
          </Typography>
        </Typography>
      </Box>
    </AuthLayout>
  );
}
