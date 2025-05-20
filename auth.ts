import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import type { JWT } from "next-auth/jwt";
import type { Session } from "next-auth";
import { db } from "@/prisma/db";

export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }: { auth: { user?: { isAdmin?: boolean } } | null; request: { nextUrl: { pathname: string } } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.isAdmin === true;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");

      if (isAdminPath) {
        return isLoggedIn && isAdmin;
      }

      return true;
    },
    // @ts-ignore - Next-auth types issue
    async jwt({ token, user, account }) {
      if (account && user) {
        try {
          let dbUser = await db.user.findUnique({
            where: { email: user.email || "" },
          });

          if (!dbUser && user.email) {
            dbUser = await db.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                password: "",
                isAdmin: user.email === process.env.ADMIN_EMAIL,
              },
            });
            console.log(`New user created: ${user.email}`);
          } else if (dbUser) {
            // Only update if admin status needs to change
            const shouldBeAdmin = user.email === process.env.ADMIN_EMAIL;
            if (dbUser.isAdmin !== shouldBeAdmin) {
              dbUser = await db.user.update({
                where: { id: dbUser.id },
                data: {
                  isAdmin: shouldBeAdmin,
                },
              });
              console.log(
                `Updated admin status for user ${user.email} to ${shouldBeAdmin}`
              );
            }
          } // @ts-ignore - we handle the typing in next-auth.d.ts
          token.isAdmin = dbUser?.isAdmin || false;
          // @ts-ignore - we handle the typing in next-auth.d.ts
          token.id = dbUser?.id;
        } catch (error) {
          console.error("Error in JWT callback:", error);
          // Return the token without modifications in case of error
          // This ensures authentication still works even if DB operations fail
        }
      }

      return token;
    }, // @ts-ignore - Next-auth types issue
    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore - we handle the typing in next-auth.d.ts
        session.user.id = token.id;
        // @ts-ignore - we handle the typing in next-auth.d.ts
        session.user.isAdmin = !!token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
