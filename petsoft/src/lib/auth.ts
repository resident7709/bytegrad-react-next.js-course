import NextAuth, { NextAuthConfig } from 'next-auth';

const config = {
  pages: {
    signIn: '/login',
  },

  providers: [],
  callbacks: {
    authorized: ({ request }) => {
      const isAppPage = request.nextUrl.pathname.includes('/app');

      if (isAppPage) {
        return false;
      } else {
        return true;
      }
    },
  },
} satisfies NextAuthConfig;

export const { auth } = NextAuth(config);
