import { db } from "@/prisma/db";
import AdminItem from "./admin-item-card";
import AddProductButton from "./buttons/add-product-button";
import { Button } from "@mui/material";

export default async function AdminPage() {
  const products = await db.product.findMany();

  return (
    <>
      <Button variant="contained" href="/admin/orders">
        Go to Order Management
      </Button>
      <AddProductButton />
      {products.map((product) => (
        <AdminItem key={product.id} product={product} />
      ))}
    </>
  );
}
