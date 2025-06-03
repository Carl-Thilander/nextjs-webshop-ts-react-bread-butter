"use server";

import { prisma } from "@/prisma/db";
import { registerSchema } from "@/lib/validations/auth";
import bcrypt from "bcryptjs";

type RegisterResult = { success: true } | { error: string };

export async function registerUser(
  formData: FormData
): Promise<RegisterResult> {
  try {
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim().toLowerCase();
    const password = formData.get("password") as string;

    const validationResult = registerSchema.safeParse({
      name,
      email,
      password,
    });
    if (!validationResult.success) {
      const firstError = validationResult.error.issues[0];
      return { error: firstError?.message || "Invalid input data" };
    }

    const existing = await prisma.user.findUnique({
      where: { email },
      select: { id: true },
    });

    if (existing) {
      return { error: "User already exists" };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    await prisma.user.create({
      data: {
        name: validationResult.data.name,
        email: validationResult.data.email,
        password: hashedPassword,
        isAdmin:
          email === process.env.ADMIN_EMAIL &&
          process.env.NODE_ENV === "production",
      },
    });

    return { success: true };
  } catch (error) {
    console.error("Registration error:", error);
    return { error: "Registration failed. Please try again." };
  }
}
