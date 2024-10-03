/* eslint-disable prettier/prettier */
//import { User as DefaultUser, Session } from 'next-auth';
//import type { NextAuthOptions } from 'next-auth';
//import { JWT } from 'next-auth/jwt';
/* eslint-disable prettier/prettier */
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuth configuration options
const authOptions: any = {
  providers: [
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        email: {
          label: 'Email',
          type: 'text',
          placeholder: '',
        },
        password: { label: 'Password', type: 'password' },
      },

      async authorize(credentials) {
        try {
          const res = await fetch(
            'https://cms.api.motac-dev.com/api/v1/auth/login',
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
              }),
            },
          );

          const user = await res.json();

          if (res.ok && user) {
            // Return the full user object
            return user;
          } else {
            throw new Error('Invalid credentials');
          }
        } catch (error: any) {
          console.error('Error during authentication:', {
            message: error.message,
            stack: error.stack,
            response: error.response || 'No response data',
          });
          throw new Error(error?.message);
        }
      },
    }),
  ],
  pages: {
    signIn: '/login',
  },
  session: {
    strategy: 'jwt',
    maxAge: 900,
  },
  callbacks: {
    jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.token;
        token.refreshToken = user.refresh_token;
        token.tokenExpires = user.token_expires;
        token.user = user.user;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenExpires = token.tokenExpires;
      session.user = token.user;

      return session;
    },
  },

  secret: 'P7wO/D0EQE4BgjmIj9I0kX1EINDcajHMoeUNwqZyZKY=',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
