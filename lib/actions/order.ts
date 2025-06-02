"use server";

import { auth } from "@/lib/auth";
import { CartItem } from "@/context/CartContext";
import { prisma } from "@/prisma/db";
import { OrderStatus } from "@prisma/client";
import { customAlphabet } from "nanoid";
import {
  cartItemSchema,
  orderIdSchema,
  orderNumberSchema,
} from "@/lib/validations/order";
import { addressSchema } from "@/lib/validations/user";

export interface AddressData {
  address: string;
  zipcode: string;
  city: string;
  phone: string;
}

export async function submitOrder(
  cartItems: CartItem[],
  addressData: AddressData
) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("You need to be logged in to place and order.");
  }

  const userId = session.user.id;

  const order = await createOrder(userId, cartItems, addressData);
  return order;
}

export async function createOrder(
  userId: string,
  cartItems: CartItem[],
  addressData: AddressData
) {
  if (!cartItems || !Array.isArray(cartItems)) {
    throw new Error("cartItems must be a valid array");
  }

  const validatedCartItems = cartItems.map((item) =>
    cartItemSchema.parse(item)
  );

  const validatedAddress = addressSchema.parse(addressData);

  const nanoid = customAlphabet("0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ", 10);
  const orderNr = `ORD-${nanoid()}`;

  const order = await prisma.$transaction(async (tx) => {
    for (const item of validatedCartItems) {
      const product = await tx.product.findUnique({
        where: { id: item.id },
      });
      if (!product) {
        throw new Error(`Product with id: ${item.id} can't be found`);
      }
      if (product.stock < item.quantity) {
        throw new Error(`Product ${item.title} is out of stock`);
      }

      await tx.product.update({
        where: { id: item.id },
        data: {
          stock: {
            decrement: item.quantity,
          },
        },
      });
    }

    const address = await tx.address.create({
      data: validatedAddress,
    });

    return await tx.order.create({
      data: {
        user: { connect: { id: userId } },
        address: { connect: { id: address.id } },
        orderNr,
        items: {
          create: validatedCartItems.map((item) => ({
            image: item.image,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
          })),
        },
      },
      include: { items: true },
    });
  });

  return order;
}

export async function getOrderById(id: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

  const validatedId = orderIdSchema.parse(id);

  const order = await prisma.order.findUnique({
    where: {
      id: validatedId,
    },
    include: {
      items: true,
      user: true,
    },
  });

  if (!order) {
    throw new Error("Order not found");
  }

  if (!session.user.isAdmin && order.userId !== session.user.id) {
    throw new Error("Unauthorized: You can only access your own orders");
  }

  return order;
}

export async function getOrderByOrderNr(orderNr: string) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }

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

    if (!session.user.isAdmin && order.userId !== session.user.id) {
      throw new Error("Unauthorized: You can only access your own orders");
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
  const session = await auth();

  if (!session?.user?.isAdmin) {
    throw new Error("Unauthorized: Admin access required");
  }

  const validatedOrderId = orderIdSchema.parse(orderId);

  try {
    await prisma.order.update({
      where: { id: validatedOrderId },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { error: "Kunde inte uppdatera orderstatus." };
  }
}
