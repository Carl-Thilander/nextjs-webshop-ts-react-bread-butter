import { prisma } from "@/prisma/db";
import AdminItem from "./admin-item-card";
import AddProductButton from "./buttons/add-product-button";
import { Button, Typography } from "@mui/material";

export default async function AdminPage() {
  const products = await prisma.product.findMany();

  return (
    <>
      <Button variant="contained" href="/admin/orders">
        Go to Order Management
      </Button>
      <Typography variant="h2" sx={{ fontSize: 36 }}>
        Inventory management
      </Typography>
      <AddProductButton />
      {products.map((product) => (
        <AdminItem key={product.id} product={product} />
      ))}
    </>
  );
}
