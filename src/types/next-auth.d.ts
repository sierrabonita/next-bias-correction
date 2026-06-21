import type { DefaultSession, DefaultUser } from "next-auth";
import type { DefaultJWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      accessToken?: string;
      refreshToken?: string;
      role?: string;
    } & DefaultSession["user"];
    error?: string;
  }

  interface User extends DefaultUser {
    id: string;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT extends DefaultJWT {
    id?: string;
    accessToken?: string;
    refreshToken?: string;
    role?: string;
    accessTokenExpires: number;
    error?: string;
  }
}
