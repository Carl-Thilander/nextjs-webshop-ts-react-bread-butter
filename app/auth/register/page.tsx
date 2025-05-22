"use client";

import RegisterForm from "@/app/components/auth/register-form";
import { useSearchParams } from "next/navigation";

export const runtime = "nodejs";

export default function RegisterPage() {
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";

  return <RegisterForm fromCart={fromCart} />;
}
