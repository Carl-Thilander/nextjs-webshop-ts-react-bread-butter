import NextAuth, { DefaultSession } from "next-auth";
import Google from "next-auth/providers/google";
import { db } from "@/prisma/db";

// Define type augmentations for NextAuth
declare module "next-auth" {
  interface User {
    isAdmin: boolean;
    id: number;
  }

  interface Session {
    user: {
      id: number;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }
}

// Define type augmentations for JWT
declare module "next-auth/jwt" {
  interface JWT {
    isAdmin: boolean;
    id: number;
  }
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Google({
      clientId: process.env.AUTH_GOOGLE_ID,
      clientSecret: process.env.AUTH_GOOGLE_SECRET,
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (!user.email) return false;

      try {
        let dbUser = await db.user.findUnique({
          where: { email: user.email },
        });

        if (!dbUser) {
          dbUser = await db.user.create({
            data: {
              email: user.email,
              name: user.name || "User",
              password: "",
              isAdmin: false,
            },
          });
        }

        // Use a type-safe approach with explicit casting
        (user as any).isAdmin = dbUser.isAdmin;
        (user as any).id = dbUser.id;

        return true;
      } catch (error) {
        console.error("Error in signIn callback:", error);
        return false;
      }
    },

    async session({ session, token }) {
      if (session.user) {
        // Type-safe assignment with proper TypeScript inference
        session.user.isAdmin = Boolean(token.isAdmin);
        (session.user as any).id = Number(token.id);
      }
      return session;
    },

    async jwt({ token, user }) {
      if (user) {
        // Type-safe assignment with proper type assertion
        token.isAdmin = (user as any).isAdmin;
        token.id = (user as any).id;
      }
      return token;
    },
  },
});
