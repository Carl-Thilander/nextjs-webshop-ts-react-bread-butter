import { auth } from "@/lib/auth";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user?.id) {
    throw new Error("Authentication required");
  }
  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (!session.user.isAdmin) {
    throw new Error("Admin access required");
  }
  return session;
}
