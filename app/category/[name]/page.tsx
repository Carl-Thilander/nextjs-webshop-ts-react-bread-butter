import { prisma } from "@/prisma/db";
import Hero from "@/app/components/layout/Hero";
import ProductFilter from "../../components/products/product-filter";

interface Props {
  params: Promise<{ name: string }>;
}

export async function generateStaticParams() {
  const categories = await prisma.category.findMany();

  return categories.map((c) => ({
    name: c.name,
  }));
}

export default async function Category({ params }: Props) {
  const { name } = await params;
  const categories = await prisma.category.findMany();
  const products = await prisma.product.findMany({
    where: {
      categories: {
        some: { name },
      },
    },
    include: {
      categories: true,
    },
  });

  return (
    <>
      <Hero />

      <ProductFilter
        products={products}
        categories={categories}
        currentCategoryName={name}
      />
    </>
  );
}
