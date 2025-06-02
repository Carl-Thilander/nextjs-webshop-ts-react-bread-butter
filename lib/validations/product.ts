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

export const productIdSchema = z.string().cuid("Invalid product ID");
export const articleNumberSchema = z
  .string()
  .min(1, "Article number is required");

export const categorySchema = z.object({
  name: z.string().min(1, "Category name cannot be empty"),
});
