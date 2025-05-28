import { auth } from "@/auth";
import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";
import { Box, Container } from "@mui/material";
import AdminOrderTable from "./admin-order-table-client";

export default async function AdminOrdersPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  // Ensure only admins can access this page
  if (!session.user.isAdmin) {
    redirect("/");
  }

  // Get all orders for admin view
  const orders = await prisma.order.findMany({
    include: {
      user: true,
      address: true,
      items: true,
    },
    orderBy: {
      date: "desc",
    },
  });

  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 6 },
        py: 4,
        bgcolor: "background.default",
        minHeight: "100vh",
      }}
    >
      <AdminOrderTable orders={orders} />
    </Box>
  );
}
