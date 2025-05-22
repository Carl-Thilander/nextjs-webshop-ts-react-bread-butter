'use client';

import { registerUser } from '@/actions/registerUser';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

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
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto', mt: 4 }}>
            <Typography variant="h5" gutterBottom>Create your account</Typography>
            <TextField name="name" label="Name" fullWidth margin="normal" required />
            <TextField name="email" label="Email" type="email" fullWidth margin="normal" required />
            <TextField name="password" label="Password" type="password" fullWidth margin="normal" required />
            {error && <Typography color="error">{error}</Typography>}
            <Button type="submit" fullWidth variant="contained" sx={{ mt: 2 }}>Register</Button>
        </Box>
        
    );
}
