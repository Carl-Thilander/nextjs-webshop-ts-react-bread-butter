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

export async function getOrderById(id: string) {
  await requireAdmin();

  const validatedId = orderIdSchema.parse(id);

  const order = await prisma.order.findUnique({
    where: { id: validatedId },
    include: { items: true, user: true, address: true },
  });

  return order;
}

export async function getOrderByOrderNr(orderNr: string) {
  await requireAdmin();

  const validatedOrderNr = orderNumberSchema.parse(orderNr);

  try {
    const order = await prisma.order.findFirst({
      where: {
        orderNr: validatedOrderNr,
      },
      include: {
        items: true,
        user: true,
        address: true,
      },
    });

    if (!order) {
      throw new Error("Order not found");
    }

    return {
      customer: order.user,
      items: order.items,
      address: order.address,
    };
  } catch (error) {
    console.error("Error fetching order:", error);
    throw new Error("Failed to fetch order");
  }
}

export async function updateOrderStatus(orderId: string, status: OrderStatus) {
  await requireAdmin();

  const validatedOrderId = orderIdSchema.parse(orderId);

  try {
    await prisma.order.update({
      where: { id: validatedOrderId },
      data: { status },
    });
    revalidatePath("/admin/orders");
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    throw new Error("Failed to update order status");
  }
}
