"use server";

import { signIn } from "@/lib/auth";
import type { LoginDto } from "@/schemas/loginSchema";

export const loginAction = async (data: LoginDto) => {
  try {
    await signIn("passwordLogin", { ...data, redirectTo: "/skills" });
  } catch (error) {
    if (error instanceof Error) {
      // biome-ignore lint/suspicious/noExplicitAny: エラーのプロパティにアクセスするため
      const err = error as any;
      if (
        err.type === "CredentialsSignin" ||
        err.type === "CallbackRouteError"
      ) {
        return { error: "メールアドレスまたはパスワードが間違っています。" };
      }
    }

    throw error;
  }
};
