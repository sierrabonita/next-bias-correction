import type { JWT } from "next-auth/jwt";

export const logoutRepo = async (refreshToken: string) => {
  const response = await fetch(`${process.env.API_BASE_URL}/auth/logout`, {
    method: "DELETE",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ refresh_token: refreshToken }),
  });

  if (!response.ok) {
    throw new Error(`API Error: ${response.status}`);
  }
};

export const refreshAccessTokenRepo = async (token: JWT): Promise<JWT> => {
  try {
    // バックエンドの refresh API を叩く
    const response = await fetch(`${process.env.API_BASE_URL}/auth/refresh`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ refresh_token: token.refreshToken }),
    });

    const refreshedTokens = await response.json();

    if (!response.ok) {
      throw refreshedTokens;
    }

    return {
      ...token,
      accessToken: refreshedTokens.access_token,
      refreshToken: refreshedTokens.refresh_token, // 新しいリフレッシュトークンで上書き
      accessTokenExpires: Date.now() + 15 * 60 * 1000,
    };
  } catch (error) {
    console.error("RefreshAccessTokenError", error);

    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
};
