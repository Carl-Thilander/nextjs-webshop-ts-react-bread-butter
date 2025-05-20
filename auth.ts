export const runtime = "nodejs"; // Make sure Prisma doesn't run in Edge

import { db } from "@/prisma/db";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";

export const config = {
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!,
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) return null;

        const user = await db.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.password) return null;

        const isValid = await bcrypt.compare(credentials.password, user.password);
        if (!isValid) return null;

        return {
          id: user.id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
        };
      },
    }),
  ],

  callbacks: {
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
          }

          if (dbUser) {
            token.id = dbUser.id;
            token.isAdmin = dbUser.isAdmin;

            if (dbUser.name) token.name = dbUser.name;
          }
        } catch (error) {
          console.error("Error in JWT callback:", error);
        }
      }

      return token;
    },

    async session({ session, token }) {
      if (session.user) {
        // @ts-ignore - custom user props
        session.user.id = token.id;
        // @ts-ignore - custom user props
        session.user.isAdmin = !!token.isAdmin;
      }
      return session;
    },
  },

  pages: {
    signIn: "/auth/signin",
    error: "/auth/error",
  },

  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
