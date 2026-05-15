import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    Credentials({
      id: "passwordLogin",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        if (!credentials?.email || !credentials?.password) {
          return null;
        }

        // TODO: サーバー側確認
        const res = await fetch(`${process.env.API_BASE_URL}/api/v1/sessions`, {
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

        // 失敗したら null を返すと、Auth.jsがエラーとして処理してくれる
        return null;
      },
    }),
  ],
});
