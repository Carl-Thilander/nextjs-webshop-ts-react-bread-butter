import { z } from "zod";

export const productSchema = z.object({
  title: z.string().min(1, "Produktnamn får inte vara tomt"),
  description: z.string().min(1, "Beskrivning får inte vara tom"),
  price: z.number().positive("Pris måste vara större än 0"),
  stock: z.number().int().nonnegative("Lagersaldo får inte vara negativt"),
  categories: z.array(z.string().cuid()).min(1, "Minst en kategori krävs"),
  image: z.string().url("Bild måste vara en giltig URL"),
});

export const userSchema = z.object({
  name: z.string().min(1, "Namn får inte vara tomt"),
  address: z.string().min(1, "Adress får inte vara tom"),
  zipcode: z.string().regex(/^\d{5}$/, "Postkoden måste vara exakt 5 siffror"),
  city: z.string().min(1, "Stad får inte vara tom"),
  email: z.string().email("Ogiltig e-postadress"),
  phone: z.string().regex(/^\+?\d{7,15}$/, "Ogiltigt telefonnummer"),
  // password: z.string().min(6, "Lösenord måste vara minst 6 tecken"), // om det behövs
});
