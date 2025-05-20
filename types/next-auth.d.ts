import NextAuth, { DefaultSession } from "next-auth";
import { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: number;
      isAdmin: boolean;
    } & DefaultSession["user"];
  }

  interface User {
    id: number;
    isAdmin: boolean;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: number;
    isAdmin: boolean;
  }
}
