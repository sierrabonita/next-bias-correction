import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        try {
          const res = await fetch(`${process.env.API_BASE_URL}/auth/login`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              email: credentials.email,
              password: credentials.password,
            }),
          });

          const data = await res.json();

          if (res.ok && data.user) {
            return {
              id: data.user.id.toString(),
              name: data.user.name,
              email: data.user.email,
              accessToken: data.token, // サーバー側からきたJWTも保存しておく
            };
          }
          return null;
        } catch (error) {
          // fetchエラー（接続拒否など）が発生した場合もnullを返す
          console.error("Auth API Error:", error);
          return null;
        }
      },
    }),
  ],
  // この callback は NextAuth の典型的な設定
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.accessToken = user.accessToken;
      }
      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken as string | undefined;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
