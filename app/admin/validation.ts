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
  // password: z.string().min(6, "Password must be at least 6 characters"), // if needed
});

// Category validation
export const categorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty"),
});

// OrderItem validation
export const orderItemSchema = z.object({
  image: z.string().url("Image must be a valid URL"),
  title: z.string().min(1, "Product name cannot be empty"),
  price: z.number().positive("Price must be greater than 0"),
  quantity: z.number().int().positive("Quantity must be at least 1"),
});

// Order validation
export const orderSchema = z.object({
  userId: z.number().int().positive("Invalid user ID"),
  items: z
    .array(orderItemSchema)
    .min(1, "Order must contain at least one product"),
  addressId: z.number().int().positive("Invalid address ID").optional(),
});
