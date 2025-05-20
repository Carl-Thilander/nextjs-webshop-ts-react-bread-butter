import { categories, products } from "@/data";
import { db } from "./db";

async function main() {
  await db.product.deleteMany();
  await db.category.deleteMany();
  await db.category.createMany({ data: categories });

  for (const { id, categories, ...product } of products) {
    await db.product.upsert({
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
    await db.$disconnect();
  });
