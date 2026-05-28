import type { NextAuthOptions } from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const authOptions: NextAuthOptions = {
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      // signIn() 実行時に実行される
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
              email: data.user.email,
              accessToken: data.access_token,
              refreshToken: data.refresh_token,
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
  callbacks: {
    // authorize, useSession(), getServerSession()実行時に実行される
    async jwt({ token, user }) {
      // user は authorizeの返り値のため, useSession()などの実行時には undefined となる
      if (user) {
        // token は NextAuth発行したトークン, そこにバックエンド発行のトークンを代入する
        // 以後 NextAuthトークンで各処理が行われる
        token.accessToken = user.accessToken;
        token.refreshToken = user.refreshToken;
        token.id = user.id;
      }
      return token;
    },
    // useSession(), getSession(), getServerSession()実行時, `/api/auth/session`リクエスト時に実行される
    async session({ session, token }) {
      if (session.user) {
        session.user.accessToken = token.accessToken;
        session.user.refreshToken = token.refreshToken;
        session.user.id = token.id;
      }
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
};
