import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { redirect } from "next/navigation";
import { Container } from "@mui/material";
import CustomerOrderList from "./customer-order-list";

export default async function UserOrdersPage() {
  const session = await auth();

  if (!session || !session.user) {
    redirect("/auth/signin");
  }

  if (session.user.isAdmin) {
    redirect("/admin/orders");
  }
  const orders = await prisma.order.findMany({
    where: {
      userId: session.user.id.toString(),
    },
    include: {
      address: true,
      items: true,
      user: true,
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
      <CustomerOrderList orders={orders} />
    </Container>
  );
}
