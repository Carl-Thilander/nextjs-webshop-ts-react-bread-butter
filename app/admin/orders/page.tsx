import { auth } from "@/auth";
import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
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
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 2,
        bgcolor: "background.paper",
        marginTop: 2,
        marginBottom: 2,
        borderRadius: 2,
        padding: 4,
      }}
    >
      <AdminOrderTable orders={orders} />
    </Container>
  );
}
