import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { Login } from "./lib/services/auth.service";
import { User } from "./lib/models/user.model";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      async authorize(credentials): Promise<User | null> {
        const { email, password } = credentials;
        const body = { email, password };

        const res = await Login(body);
        const user = res.data;

        if (!user) return null;
        return user as User;
      },
    }),
  ],
});
