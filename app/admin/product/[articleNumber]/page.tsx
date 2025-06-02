import { prisma } from "@/prisma/db";
import { Dialog } from "@mui/material";
import ProductForm from "../../../components/products/product-form";

interface Props {
  params: Promise<{ articleNumber: string }>;
}

export default async function EditProductPage({ params }: Props) {
  const { articleNumber } = await params;

  const product = await prisma.product.findUnique({
    where: { articleNumber },
    include: { categories: true },
  });

  if (!product) return <main>404</main>;
  return (
    <Dialog disableScrollLock open>
      <ProductForm product={product} />
    </Dialog>
  );
}
