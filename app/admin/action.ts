"use server";

import { auth } from "@/auth";
import { CartItem } from "@/context/CartContext";
import { db } from "@/prisma/db";
import { Prisma } from "@prisma/client";
import { customAlphabet } from "nanoid";
import { revalidatePath } from "next/cache";
import { OrderStatus } from "@prisma/client";

interface AddressData {
  address: string;
  zipcode: string;
  city: string;
  phone: string;
}

export async function createProduct(product: Prisma.ProductCreateInput) {
  const nanoid = customAlphabet("1234567890", 4);
  product.articleNumber = nanoid();
  await db.product.create({ data: product });
  revalidatePath("/admin");
}

export async function deleteProduct(id: string) {
  await db.product.delete({ where: { id: id } });
  revalidatePath("/");
}

export async function updateProduct(
  articleNumber: string,
  data: Prisma.ProductUpdateInput
) {
  await db.product.update({
    where: { articleNumber },
    data,
  });
  revalidatePath("/admin");
}
export async function submitOrder(
  cartItems: CartItem[],
  addressData: AddressData
) {
  const session = await auth(); // ✅ get logged-in session

  if (!session?.user?.id) {
    throw new Error("You need to be logged in to place and order.");
  }

  const userId = session.user.id;

  const order = await createOrder(userId, cartItems, addressData);
  return order;
}

export async function createOrder(
  userId: number,
  cartItems: CartItem[],
  addressData: AddressData
) {
  if (!cartItems || !Array.isArray(cartItems)) {
    throw new Error("cartItems must be a valid array");
  }

  if (
    !addressData.address ||
    !addressData.zipcode ||
    !addressData.city ||
    !addressData.phone
  ) {
    throw new Error("All address fields are required");
  }

  const orderNr = `${Date.now()}`;
  const address = await db.address.create({
    data: addressData,
  });

  const order = await db.order.create({
    data: {
      user: { connect: { id: userId } },
      address: { connect: { id: address.id } },
      orderNr,
      items: {
        create: cartItems.map((item) => ({
          image: item.image,
          title: item.title,
          price: item.price,
          quantity: item.quantity,
        })),
      },
    },
    include: { items: true },
  });

  return order;
}

export async function getOrderById(id: string) {
  const order = await db.order.findUnique({
    where: {
      id: id,
    },
    include: {
      items: true,
      user: true,
    },
  });

  return order;
}

export async function getOrderByOrderNr(orderNr: string) {
  try {
    const order = await db.order.findFirst({
      where: {
        orderNr: orderNr,
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
  try {
    await db.order.update({
      where: { id: orderId },
      data: { status },
    });
    return { success: true };
  } catch (error) {
    console.error("Failed to update order status:", error);
    return { error: "Kunde inte uppdatera orderstatus." };
  }
}
