"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import {
  productSchema,
  productIdSchema,
  articleNumberSchema,
} from "@/lib/validations/product";
import { title } from "process";

export async function createProduct(product: any) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validatedProduct = productSchema.parse({
    ...product,
    categories: product.categories.connect.map((c: { id: string }) => c.id),
  });

  const nanoid = customAlphabet("1234567890", 4);
  const productData = {
    ...validatedProduct,
    articleNumber: nanoid(),
    categories: {
      connect: validatedProduct.categories.map((id: string) => ({ id })),
    },
  };

  await prisma.product.create({ data: productData });
  revalidatePath("/admin");
  return { success: true, message: "Product created successfully!" };
}

export async function deleteProduct(id: string) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validatedId = productIdSchema.parse(id);

  await prisma.product.delete({ where: { id: validatedId } });
  revalidatePath("/");
  return { success: true, message: "Product deleted successfully!" };
}

export async function updateProduct(
  articleNumber: string,
  data: any
) {
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validatedArticleNumber = articleNumberSchema.parse(articleNumber);

  const validatedData = productSchema.partial().parse({ ...data, categories: data.categories.connect.map((c: { id: string }) => c.id) });

  const updateData: Prisma.ProductUpdateInput = {
    title: validatedData.title,
    description: validatedData.description,
    price: validatedData.price,
    stock: validatedData.stock,
    image: validatedData.image,
    ...(validatedData.categories && {
      categories: {
        set: validatedData.categories.map((id: string) => ({ id })),
      },
    }),
  };

  await prisma.product.update({
    where: { articleNumber: validatedArticleNumber },
    data: updateData,
  });
  revalidatePath("/admin");
  revalidatePath("/product/[articleNumber]");
  revalidatePath("/");
  return { success: true, message: "Product updated successfully!" };
}

export async function getAllCategories() {
  return await prisma.category.findMany();
}
