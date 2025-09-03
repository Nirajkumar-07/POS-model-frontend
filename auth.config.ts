import type { NextAuthConfig } from "next-auth";
import { User } from "./lib/models/user.model";
export const authConfig = {
  pages: {
    signIn: "/login",
  },
  jwt: {
    maxAge: 60 * 60,
  },
  trustHost: true,
  providers: [],
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnPage = nextUrl.pathname.startsWith("/suppliers");

      if (isOnPage) {
        if (isLoggedIn) return true;
        return false;
      } else if (isLoggedIn) {
        return Response.redirect(new URL("/suppliers", nextUrl));
      }
      return true;
    },
    jwt({ token, user }) {
      if (user) {
        const u = user as any;
        token.id = u.userId;
        token.token = u.token;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.id = token.userId as string;
        session.sessionToken = token.token as string;
      }
      return session;
    },
  },
} satisfies NextAuthConfig;
