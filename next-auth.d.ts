// next-auth.d.ts
// export declare module 'next-auth' {}
//import NextAuth, { User as DefaultUser } from "next-auth";
import NextAuth from "next-auth";
import { JWT as DefaultJWT } from "next-auth/jwt";
import { Session as NextSession } from 'next-auth'


declare module "next-auth" {

 // interface User extends DefaultUser {
  //  token?: string; 
  //}

  interface Session extends NextSession {
    accessToken?: string;
  }


  /*  interface NextAuthOptions {
    providers: any[];
    pages?: any;
    session?: any;
    callbacks?: any;
    secret?: string;
  } */

}

// Extend the default JWT interface
declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT{
    accessToken?: string;
  }
}
