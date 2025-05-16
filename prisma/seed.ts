import { products } from "@/data";
import { db } from "./db";

async function main() {
  await db.product.deleteMany();
  await db.category.deleteMany();
  for (const { id, categories, ...product } of products) {
    await db.product.upsert({
      where: { articleNumber: product.articleNumber },
      update: {},
      create: {
        ...product,
        categories: {
          connectOrCreate: (categories ?? [])
            .filter((catName) => catName && catName.trim() !== "")
            .map((catName) => ({
              where: { name: catName }, // <-- FIXED: use name, not id
              create: { name: catName },
            })),
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
