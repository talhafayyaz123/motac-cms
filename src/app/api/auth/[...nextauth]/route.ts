import NextAuth, { NextAuthOptions } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';

// NextAuth configuration options
const authOptions: NextAuthOptions = {
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
            'http://cms-api-motac.ap-south-1.elasticbeanstalk.com/api/v1/auth/login',
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
            return { ...user, token: user.token };
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
  },
  callbacks: {
    jwt({ token, user }) {
      if (user && user.token) {
        token.accessToken = user.token;
      }
      return token;
    },
    session({ session, token }) {
      session.accessToken = token.accessToken as string | undefined;
      return session;
    },
  },

  secret: 'P7wO/D0EQE4BgjmIj9I0kX1EINDcajHMoeUNwqZyZKY=',
};

// Default export of NextAuth
const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };