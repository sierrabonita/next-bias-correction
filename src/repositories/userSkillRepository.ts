import { getServerSession } from "next-auth";
import { InfrastructureError } from "@/errors/InfrastructureError";
import { authOptions } from "@/lib/auth";

const getBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL が定義されていません");
  }
  return baseUrl;
};

const getAuthHeaders = async (): Promise<Record<string, string>> => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;

  return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getUserSkillsByIdRepo = async (id: string, page: string = "1") => {
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${getBaseUrl()}/users/${id}/skills?page=${page}`, {
    cache: "no-store",
    headers: { ...authHeaders },
  });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }

  return res.json();
};
