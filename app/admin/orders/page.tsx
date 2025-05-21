import { Container } from "@mui/material";
import AdminOrderTable from "./admin-order-table-client";
import { db } from "@/prisma/db";

export default async function OrdersManagementPage() {
  const orders = await db.order.findMany({
    include: {
      user: true,
      address: true,
      items: true,
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
