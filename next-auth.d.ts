// next-auth.d.ts
import NextAuth, { User as DefaultUser } from "next-auth";

declare module "next-auth" {
  interface User extends DefaultUser {
    token?: string; 
  }

  interface Session {
    accessToken?: string;
  }
}