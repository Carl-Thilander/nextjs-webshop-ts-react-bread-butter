"use server";

import { prisma } from "@/prisma/db";
import { registerSchema } from "@/lib/auth-validation";
import bcrypt from "bcryptjs";

export async function registerUser(formData: FormData) {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  const validationResult = registerSchema.safeParse({ name, email, password });
  if (!validationResult.success) {
    return { error: "Invalid input data" };
  }

  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) return { error: "User already exists" };

  const hashedPassword = await bcrypt.hash(password, 10);

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
      isAdmin: email === process.env.ADMIN_EMAIL,
    },
  });

  return { success: true };
}
