"use server";

import { auth } from "@/lib/auth";
import { prisma } from "@/prisma/db";
import { OrderStatus } from "@prisma/client";
import { revalidatePath } from "next/cache";
import { orderIdSchema, orderNumberSchema } from "@/lib/validations/order";

async function requireAdmin() {
  const session = await auth();
  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }
  return session;
}

export async function getAllOrders() {
  await requireAdmin();

  return await prisma.order.findMany({
    include: {
      items: true,
      user: true,
      address: true,
    },
    orderBy: {
      date: "desc",
    },
  });
}
