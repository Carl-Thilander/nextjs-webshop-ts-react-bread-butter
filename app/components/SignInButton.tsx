'use client';

import { signIn, signOut } from '@/auth';
import { useSession } from 'next-auth/react';
import { Button } from '@mui/material';
import GitHubIcon from '@mui/icons-material/GitHub';

export default function SignInButton() {
  const { data: session } = useSession();

  if (session && session.user) {
    return (
      <Button 
        variant="outlined" 
        onClick={() => signOut()}
        startIcon={<GitHubIcon />}
      >
        Sign Out
      </Button>
    );
  }

  return (
    <Button 
      variant="contained" 
      onClick={() => signIn('github')}
      startIcon={<GitHubIcon />}
    >
      Sign in with GitHub
    </Button>
  );
}