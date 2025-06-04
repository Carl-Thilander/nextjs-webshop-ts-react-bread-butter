"use server";

import { CartItem } from "@/context/CartContext";
import { prisma } from "@/prisma/db";
import { customAlphabet } from "nanoid";
import { cartItemSchema } from "@/lib/validations/order";
import { addressSchema } from "@/lib/validations/user";
import { AddressData } from "./submitOrder";
import { revalidatePath } from "next/cache";

export async function createOrder(
    userId: string,
    cartItems: CartItem[],
    addressData: AddressData
) {
    if (!Array.isArray(cartItems)) {
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
            const product = await tx.product.findUnique({ where: { id: item.id } });
            if (!product) throw new Error(`Product with id: ${item.id} can't be found`);
            if (product.stock < item.quantity)
                throw new Error(`Product ${item.title} is out of stock`);

            await tx.product.update({
                where: { id: item.id },
                data: { stock: { decrement: item.quantity } },
            });
        }

        const address = await tx.address.create({ data: validatedAddress });

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

    revalidatePath("/");

    return order;

}
