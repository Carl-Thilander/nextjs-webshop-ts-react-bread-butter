import { categories, products } from "@/data";
import { prisma } from "./db";

async function main() {
  await prisma.product.deleteMany();
  await prisma.category.deleteMany();
  await prisma.category.createMany({ data: categories });
  for (const { id, categories, ...product } of products) {
    await prisma.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: {},
      create: {
        ...product,
        categories: {
          connect: categories.map((name) => ({ name })),
        },
      },
    });
  }
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
