import { z } from "zod";

export const userSchema = z.object({
  name: z.string().min(1, "Name cannot be empty"),
  address: z.string().min(1, "Address cannot be empty"),
  zipcode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  city: z.string().min(1, "City cannot be empty"),
  email: z.string().email("Invalid email address"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number"),
});

export const addressSchema = z.object({
  address: z
    .string()
    .min(1, "Address is required")
    .max(255, "Address too long"),
  zipcode: z.string().regex(/^\d{5}$/, "Zip code must be exactly 5 digits"),
  city: z.string().min(1, "City is required").max(100, "City name too long"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Invalid phone number format"),
});
