import { prisma } from "@/prisma/db";
import Hero from "@/app/components/layout/Hero";
import ProductFilter from "./components/products/product-filter";

export default async function Home() {
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    include: {
      categories: true,
    },
  });

  
  return (
    <>
      <Hero />

      <ProductFilter categories={categories} products={products} />
    </>
  );
}
