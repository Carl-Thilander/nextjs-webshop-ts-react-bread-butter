"use client";

import { signIn, signOut } from "next-auth/react";
import { useSession } from "next-auth/react";
import { Button } from "@mui/material";
import GitHubIcon from "@mui/icons-material/GitHub";

export default function SignInButton() {
  const { data: session, status } = useSession();

  if (status === "loading") {
    return null;
  }

  if (session) {
    return (
      <Button
        variant="outlined"
        onClick={() => signOut()}
        sx={{
          color: "text.primary",
          borderColor: "text.primary",
          "&:hover": { bgcolor: "primary.light" },
        }}
      >
        Logga ut
      </Button>
    );
  }

  const handleSignIn = () => {
    signIn("github", { callbackUrl: window.location.origin });
  };

  return (
    <Button
      variant="outlined"
      startIcon={<GitHubIcon />}
      onClick={handleSignIn}
      sx={{
        color: "text.primary",
        borderColor: "text.primary",
        "&:hover": { bgcolor: "primary.light" },
      }}
    >
      Logga in
    </Button>
  );
}
