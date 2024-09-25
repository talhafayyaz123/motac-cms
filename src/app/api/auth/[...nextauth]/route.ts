import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuth configuration options
export const authOptions: NextAuthOptions = {
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
        userAgent: {
          label: 'User Agent',
          type: 'text',
          placeholder: 'Browser user agent',
        },
      },
      async authorize(credentials, req) {
        try {
          const userAgent =
            req?.headers?.['user-agent'] || credentials?.userAgent;

          const res = await fetch(
            `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/auth/login`,
            {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                email: credentials?.email,
                password: credentials?.password,
                userAgent: userAgent,
              }),
            },
          );

          const user = await res.json();

          if (res.ok && user) {
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
    signIn: '/auth/login',
  },
  session: {
    strategy: 'jwt',
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.token;
      }
      return token;
    },
    async session({ session, token }) {
      session.accessToken = token.accessToken;
      return session;
    },
  },
};

// Default export of NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
