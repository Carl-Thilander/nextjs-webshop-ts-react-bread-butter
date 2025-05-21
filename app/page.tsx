import { db } from "@/prisma/db";
import Hero from "./components/hero";
import ProductFilter from "./components/product-filter";

export default async function Home() {
  const categories = await db.category.findMany();
  const products = await db.product.findMany({
    include: {
      categories: true, // Ensure categories are fetched
    },
  });

  
  return (
    <>
      <Hero />

      <ProductFilter categories={categories} products={products} />
      
    </>
  );
}
