'use client';

import { registerUser } from '@/actions/registerUser';
import { Alert, Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { AuthLayout } from './auth-layout';

export default function RegisterForm() {
    const [error, setError] = useState('');
    const router = useRouter();
   

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);
        const res = await registerUser(formData);

        if (res?.error) setError(res.error);
        else router.push('/auth/signin');
    };

    return (
        <AuthLayout
            title="Create Account"
            subtitle="Get started with your account"
        >
            <Box component="form" onSubmit={handleSubmit} sx={{
                width: '100%',
                '& .MuiTextField-root': {
                    backgroundColor: 'background.paper',
                    borderRadius: '8px',
                    '& fieldset': { borderColor: 'divider' }
                }
            }}>
                {error && <Alert severity="error" sx={{ mb: 3 }}>{error}</Alert>}

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                    <TextField
                        name="name"
                        label="Name"
                        fullWidth
                        required
                    />
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
                        Create Account
                    </Button>
                </Box>

                <Typography variant="body2" sx={{
                    textAlign: 'center',
                    mt: 3,
                    color: 'text.secondary'
                }}>
                    Already have an account?{' '}
                    <Typography
                        component="span"
                        sx={{
                            color: 'primary.main',
                            cursor: 'pointer',
                            '&:hover': { textDecoration: 'underline' }
                        }}
                        onClick={() => router.push('/auth/signin')}
                    >
                        Sign in
                    </Typography>
                </Typography>
            </Box>
        </AuthLayout>
    );
}