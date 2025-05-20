'use client';

import GoogleIcon from "@mui/icons-material/Google";
import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Container,
    Paper,
    TextField,
    Typography,
} from "@mui/material";
import { signIn } from "next-auth/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const callbackUrl = searchParams?.get("callbackUrl") || "/";
    const redirectError = searchParams?.get("error");

    const [formError, setFormError] = useState('');
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
        <Container maxWidth="sm" sx={{ pt: 8 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    <Typography variant="h4" component="h1" align="center">
                        Sign in
                    </Typography>

                    <Typography variant="body1" align="center">
                        Sign in with your email or Google account.
                    </Typography>

                    {(redirectError || formError) && (
                        <Alert severity="error">
                            {formError ||
                                (redirectError === "OAuthSignin"
                                    ? "Det gick inte att starta inloggningen."
                                    : redirectError === "OAuthCallback"
                                    ? "Det gick inte att slutföra inloggningen."
                                    : redirectError === "OAuthAccountNotLinked"
                                    ? "E-postadressen är redan kopplad till ett annat konto."
                                    : "Ett fel uppstod vid inloggningen. Försök igen.")}
                        </Alert>
                    )}

                    {/* Credentials Form */}
                    <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                        <TextField name="email" label="Email" type="email" fullWidth required />
                        <TextField name="password" label="Password" type="password" fullWidth required />
                        <Button type="submit" fullWidth variant="contained" sx={{ mt: 1 }}>
                            Login with Email
                        </Button>
                    </Box>

                    {/* Google Sign-In */}
                    <Button
                        variant="contained"
                        fullWidth
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
