import { withAuth } from "next-auth/middleware";

export default withAuth({
  callbacks: {
    authorized: ({ token }) => {
      // トークンが存在し、かつリフレッシュエラーが起きていない場合のみ許可
      return !!token && token.error !== "RefreshAccessTokenError";
    },
  },
  // callbacks の authorized が false の場合 NextAuth の signin デフォルト画面(/api/auth/signin)に遷移する
  // pages の役割はデフォルトではなくどのページに遷移するかを指定すること
  pages: {
    signIn: "/",
  },
});

export const config = {
  // 未ログインユーザーから保護するルート
  matcher: ["/home/:path*"],
};
