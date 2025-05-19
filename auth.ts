import { db } from "@/prisma/db";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import Google from "next-auth/providers/google";

export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.isAdmin === true;
      const isAdminPath = nextUrl.pathname.startsWith("/admin");

      if (isAdminPath) {
        return isLoggedIn && isAdmin;
      }

      return true;
    },
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
          } else if (dbUser) {
            dbUser = await db.user.update({
              where: { id: dbUser.id },
              data: {
                isAdmin: user.email === process.env.ADMIN_EMAIL,
              },
            });
          }

          token.isAdmin = dbUser?.isAdmin || false;
          token.id = dbUser?.id;
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id;
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
