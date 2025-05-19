import { db } from "@/prisma/db";
import AdminItem from "./admin-item-card";
import AddProductButton from "./buttons/add-product-button";

export default async function AdminPage() {
  const products = await db.product.findMany();

  return (
    <>
      <AddProductButton />
      {products.map((product) => (
        <AdminItem key={product.id} product={product} />
      ))}
    </>
  );
}
