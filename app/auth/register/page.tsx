"use client";

import RegisterForm from "@/app/components/auth/register-form";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

export const runtime = "nodejs";

function RegisterContent() {
  const searchParams = useSearchParams();
  const fromCart = searchParams.get("from") === "cart";

  return <RegisterForm fromCart={fromCart} />;
}

export default function RegisterPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RegisterContent />
    </Suspense>
  );
}
