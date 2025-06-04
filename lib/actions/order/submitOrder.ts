"use server";

import { auth } from "@/lib/auth";
import { CartItem } from "@/context/CartContext";
import { prisma } from "@/prisma/db";
import { OrderStatus } from "@prisma/client";
import {
    orderIdSchema,
    orderNumberSchema,
} from "@/lib/validations/order";
import { createOrder } from "./createOrder";
import { revalidatePath } from "next/cache";

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
        throw new Error("You need to be logged in to place an order.");
    }
    revalidatePath("/");
    return await createOrder(session.user.id, cartItems, addressData);
}

export async function getOrderById(id: string) {
    const session = await auth();
    if (!session?.user?.id) throw new Error("Authentication required");

    const validatedId = orderIdSchema.parse(id);

    const order = await prisma.order.findUnique({
        where: { id: validatedId },
        include: { items: true, user: true },
    });

    if (!order) throw new Error("Order not found");
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
