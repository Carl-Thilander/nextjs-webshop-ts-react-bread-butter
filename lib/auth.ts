export const runtime = "nodejs";

import { prisma } from "@/prisma/db";
import bcrypt from "bcryptjs";
import type { NextAuthConfig } from "next-auth";
import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import CredentialsProvider from "next-auth/providers/credentials";
import Google from "next-auth/providers/google";
import { APP_CONFIG } from "@/lib/config";

export const config = {
  adapter: PrismaAdapter(prisma),
  providers: [
    Google({
      clientId: APP_CONFIG.AUTH_GOOGLE_ID,
      clientSecret: APP_CONFIG.AUTH_GOOGLE_SECRET,
      profile(profile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          isAdmin: profile.email === APP_CONFIG.ADMIN_EMAIL,
        };
      },
    }),

    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Email and password are required");
        }

        const email = credentials.email as string;
        const password = credentials.password as string;

        const user = await prisma.user.findUnique({
          where: { email },
        });
        if (!user || !user.password) {
          throw new Error("CredentialsSignin");
        }

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) {
          throw new Error("CredentialsSignin");
        }

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
          const email = user.email || "";
          let dbUser = await prisma.user.findUnique({
            where: { email },
          });
          if (!dbUser && user.email) {
            const isAdmin = user.email === APP_CONFIG.ADMIN_EMAIL;
            dbUser = await prisma.user.create({
              data: {
                email: user.email,
                name: user.name || "",
                password: "",
                isAdmin,
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
        session.user.id = token.id as string;
        session.user.isAdmin = Boolean(token.isAdmin);
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
    maxAge: 30 * 24 * 60 * 60,
  },
  events: {
    async signIn({ user, account, profile }) {
      if (process.env.NODE_ENV === "development") {
        console.log("User signed in:", user.email);
      }
    },
  },
  secret: process.env.AUTH_SECRET,
} satisfies NextAuthConfig;

export const { handlers, auth, signIn, signOut } = NextAuth(config);
