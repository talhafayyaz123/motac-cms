/* eslint-disable prettier/prettier */
//import { User as DefaultUser, Session } from 'next-auth';
//import type { NextAuthOptions } from 'next-auth';
//import { JWT } from 'next-auth/jwt';
/* eslint-disable prettier/prettier */
import CryptoJS from 'crypto-js';
import NextAuth from 'next-auth/next';
import CredentialsProvider from 'next-auth/providers/credentials';
const apiUrl = process.env.NEXT_PUBLIC_API_URL;

// Token refresh logic
async function attemptReLogin(email: string, password: string) {
  try {
    const res = await fetch(`${apiUrl}/auth/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const newTokens = await res.json();

    if (!res.ok) {
      console.error('Re-login request failed:', newTokens);
      return null;
    }

    return {
      accessToken: newTokens.token,
      refreshToken: newTokens.refresh_token,
      tokenExpires: newTokens.token_expires,
    };
  } catch (error) {
    console.error('Error during re-login:', error);
    return null;
  }
}

async function refreshAccessToken(token: any) {
  const res = await fetch(`${apiUrl}/auth/refresh`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token.refreshToken}`,
    },
  });

  const refreshedTokens = await res.json();

  if (!res.ok) {
    const decryptedBytes = CryptoJS.AES.decrypt(
      token.encryptedPassword,
      'motac-cms-ses',
    );
    const decryptedPassword = decryptedBytes.toString(CryptoJS.enc.Utf8);

    const newTokens = await attemptReLogin(token.user.email, decryptedPassword);

    if (newTokens) {
      return {
        ...token,
        accessToken: newTokens.accessToken,
        refreshToken: newTokens.refreshToken,
        tokenExpires: newTokens.tokenExpires,
      };
    } else {
      throw new Error('Failed to refresh access token and re-login.');
    }
  }

  return {
    ...token,
    accessToken: refreshedTokens.token,
    refreshToken: refreshedTokens.refresh_token,
    tokenExpires: refreshedTokens.token_expires,
  };
}

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
          const res = await fetch(`${apiUrl}/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password,
            }),
          });

          const user = await res.json();

          if (res.ok && user) {
            // Ensure password is defined
            if (!credentials?.password) {
              throw new Error('Password is required');
            }

            // Encrypt the password
            const encryptedPassword = CryptoJS.AES.encrypt(
              credentials.password,
              'motac-cms-ses',
            ).toString();

            return { ...user, encryptedPassword };
          } else {
            throw new Error('Invalid Credentials');
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
    maxAge: 3300,
  },
  callbacks: {
    async jwt({ token, user }: { token: any; user?: any }) {
      if (user) {
        token.accessToken = user.token;
        token.refreshToken = user.refresh_token;
        token.tokenExpires = user.token_expires;
        token.user = user.user;
        if (user?.encryptedPassword) {
          token.encryptedPassword = user.encryptedPassword;
        }
      }

      const expirationTime = new Date(token.tokenExpires).getTime();
      const remainingTime = (expirationTime - Date.now()) / 1000; // In seconds
      if (remainingTime <= 20) {
        const data = await refreshAccessToken(token);
        return data;
      }
      return token;
    },
    session({ session, token }: { session: any; token: any }) {
      session.accessToken = token.accessToken;
      session.refreshToken = token.refreshToken;
      session.tokenExpires = token.tokenExpires;
      session.user = token.user;
      session.encryptedPassword = token.encryptedPassword;
      return session;
    },
  },

  secret: 'P7wO/D0EQE4BgjmIj9I0kX1EINDcajHMoeUNwqZyZKY=',
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
