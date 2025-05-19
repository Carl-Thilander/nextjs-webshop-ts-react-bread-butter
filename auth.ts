import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import type { NextAuthConfig } from "next-auth";
import { db } from "@/prisma/db";

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
      // Initial sign in
      if (account && user) {
        // Check in database if user is admin
        const dbUser = await db.user.findUnique({
          where: { email: user.email || "" },
        });

        if (dbUser) {
          token.isAdmin = dbUser.isAdmin || false;
        } else {
          // No user in DB yet, check by email
          token.isAdmin = user.email === "tomasis7@gmail.com";
        }

        return token;
      }

      // Return previous token if the user already exists
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.isAdmin = !!token.isAdmin;
      }
      return session;
    },
  },
  pages: {
    signIn: "/api/auth/signin",
    error: "/api/auth/error",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
