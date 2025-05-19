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
          connectOrCreate: categories.map(({ name, imageURL }) => ({
            where: { name }, // <-- FIXED: use name, not id
            create: { name, imageURL }, // <-- FIXED: use imageURL, not image
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
