import { getServerSession } from "next-auth";
import { InfrastructureError } from "@/errors/InfrastructureError";
import { authOptions } from "@/lib/auth";
import type { CreateSkillDto } from "@/schemas/skillSchema";

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

export const fetchAllSkills = async () => {
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${getBaseUrl()}/skills`, {
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

export const createSkillRepo = async (data: CreateSkillDto) => {
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${getBaseUrl()}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...authHeaders,
    },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }

  return res.json();
};

export const deleteSkillRepo = async (id: string) => {
  const authHeaders = await getAuthHeaders();
  const res = await fetch(`${getBaseUrl()}/skills/${id}`, {
    method: "DELETE",
    headers: { ...authHeaders },
  });

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }
};
