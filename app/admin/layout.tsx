import { Box, Container } from "@mui/material";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth();

  if (!session?.user) {
    redirect("/auth/signin");
  }

  if (!session.user.isAdmin) {
    redirect("/");
  }
  return (
    <Box
      component="main"
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        bgcolor: "background.paper",

        minHeight: "100vh",
        padding: { xs: 2, sm: 4 },
      }}
    >
      {children}
    </Box>
  );
}
