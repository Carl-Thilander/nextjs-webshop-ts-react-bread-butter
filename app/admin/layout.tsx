import { Box, Container } from "@mui/material";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
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
