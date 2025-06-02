import { z } from "zod";

export const orderItemSchema = z.object({
  image: z.string().min(1, "Image path is required"),
  title: z.string().min(1, "Product name cannot be empty"),
  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

export const orderSchema = z.object({
  userId: z.number().int().positive("Invalid user ID"),
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one product"),
  addressId: z.number().int().positive("Invalid address ID").optional(),
});

export const orderIdSchema = z.string().cuid("Invalid order ID");
export const orderNumberSchema = z
  .string()
  .regex(/^ORD-[A-Z0-9]{10}$/, "Invalid order number format");

export const cartItemSchema = z.object({
  id: z.string().cuid("Invalid product ID"),
  title: z.string().min(1, "Product title is required"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  image: z.string().min(1, "Image path is required"),
});
