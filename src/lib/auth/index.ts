import type { NextAuthOptions } from "next-auth";
import type { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import {
  logoutService,
  refreshAccessTokenService,
} from "@/services/authService";

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
    async jwt({ token, user }): Promise<JWT> {
      // user は authorizeの返り値のため, useSession()などの実行時には undefined となる
      if (user) {
        // バックエンドで設定した15分（900秒）に合わせて、NextAuth側の有効期限も設定します
        const accessTokenExpires = Date.now() + 15 * 60 * 1000;

        // token は NextAuth発行したトークン, そこにバックエンド発行のトークンを代入する
        // 以後 NextAuthトークンで各処理が行われる
        return {
          ...token,
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
          id: user.id,
          accessTokenExpires,
        } as JWT;
      }

      // 現在時刻がアクセストークンの有効期限より前であれば、そのままトークンを返す
      // 安全のため、期限切れの1分前（60秒前）にリフレッシュを試みる
      const exp = token.accessTokenExpires as number | undefined;

      if (exp && Date.now() < exp - 60 * 1000) {
        return token;
      }

      if (token.refreshToken) {
        return (await refreshAccessTokenService(token)) as JWT;
      }

      return token;
    },
    // useSession(), getSession(), getServerSession()実行時, `/api/auth/session`リクエスト時に実行される
    async session({ session, token }) {
      session.user.id = token.id as string;
      session.user.accessToken = token.accessToken as string;
      session.user.refreshToken = token.refreshToken as string;
      session.error = token.error;
      return session;
    },
  },
  pages: {
    signIn: "/",
  },
  events: {
    async signOut({ token }) {
      if (token.refreshToken && token.accessToken) {
        try {
          await logoutService(token.refreshToken);
        } catch (error) {
          console.error("バックエンドのトークン無効化に失敗しました", error);
        }
      }
    },
  },
};
