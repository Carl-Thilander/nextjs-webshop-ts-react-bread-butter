'use server';

import { db } from "@/prisma/db";
import bcrypt from "bcryptjs";
export async function registerUser(formData: FormData) {
    const name = formData.get("name") as string;
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    const existing = await db.user.findUnique({ where: { email } });
    if (existing) return { error: "User already exists" };

    const hashedPassword = await bcrypt.hash(password, 10);

    await db.user.create({
        data: {
            name,
            email,
            password: hashedPassword,
            isAdmin: email === process.env.ADMIN_EMAIL,
        },
    });

    return { success: true };
}
