'use client';

import { Box, Button, TextField, Typography } from '@mui/material';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginForm() {
    const [error, setError] = useState('');
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        const res = await signIn('credentials', {
            redirect: false,
            email: formData.get('email'),
            password: formData.get('password'),
            callbackUrl: '/',
        });

        if (res?.error) setError('Invalid email or password');
        else router.push('/');
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 10 }}>
            <Typography variant="h5" gutterBottom>Login to your account</Typography>
            <TextField name="email" label="Email" type="email" fullWidth margin="normal" required />
            <TextField name="password" label="Password" type="password" fullWidth margin="normal" required />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Login</Button>
        </Box>
    );
}
