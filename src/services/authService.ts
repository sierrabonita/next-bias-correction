import type { JWT } from "next-auth/jwt";
import {
  logoutRepo,
  refreshAccessTokenRepo,
} from "@/repositories/authRepository";

export const logoutService = async (refreshToken: string) => {
  await logoutRepo(refreshToken);
};

export const refreshAccessTokenService = async (token: JWT) => {
  return await refreshAccessTokenRepo(token);
};
