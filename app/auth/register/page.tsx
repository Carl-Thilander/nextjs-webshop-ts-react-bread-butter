"use client";

import RegisterForm from "@/app/components/auth/register-form";
import { Box, Link, Typography } from "@mui/material";
import { useSearchParams } from "next/navigation";
export const runtime = "nodejs";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";
  return (
     <Box 
      sx={{
        
        
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: 4,
        bgcolor: "background.paper",
        borderRadius: 2,
        margin: "2rem 0",
        maxWidth: "400px",
        marginX: "auto",
        gap: 2,
        }}>
      {fromCart && (
        <Typography color="black" variant="h6" sx={{ mb: 2 }}>
          You need to be a registred user to checkout. Please register or log in.
        </Typography>
      )}
      <RegisterForm />
      <Typography
        variant="body2">
          Already a member?{" "}
          <Link href="/auth/signin" color="#52B788">
            Log in here
          </Link>
        </Typography>
    </Box>
  ) 
}
