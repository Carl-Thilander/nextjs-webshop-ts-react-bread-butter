import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Product name cannot be empty"),
  description: z.string().min(1, "Description cannot be empty"),
  price: z.number().positive("Price must be greater than 0"),
  stock: z.number().int().nonnegative("Stock cannot be negative"),
  categories: z
    .array(z.string().cuid())
    .min(1, "At least one category is required"),
  image: z.string().url("Image must be a valid URL"),
});

export const userSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  zipcode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  city: z.string().min(1, "City cannot be empty"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number"),
});

export const categorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty"),
});

export const orderItemSchema = z.object({
  image: z.string().url("Image must be a valid URL"),
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

export const productIdSchema = z.string().cuid("Invalid product ID");
export const articleNumberSchema = z
  .string()
  .min(1, "Article number is required");
export const orderIdSchema = z.string().cuid("Invalid order ID");
export const orderNumberSchema = z
  .string()
  .regex(/^ORD-[A-Z0-9]{10}$/, "Invalid order number format");

export const addressSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address too long"),
  zipcode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  city: z.string().min(1, "City is required").max(100, "City name too long"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
});

export const cartItemSchema = z.object({
  id: z.string().cuid("Invalid product ID"),
  title: z.string().min(1, "Product title is required"),
  price: z.number().positive("Price must be positive"),
  quantity: z.number().int().positive("Quantity must be a positive integer"),
  image: z.string().url("Image must be a valid URL"),
});
