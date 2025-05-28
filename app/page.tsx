import { prisma } from "@/prisma/db";
import Hero from "./components/hero";
import ProductFilter from "./components/product-filter";

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
