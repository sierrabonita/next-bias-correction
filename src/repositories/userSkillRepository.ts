import { getServerSession } from "next-auth";
import { InfrastructureError } from "@/errors/InfrastructureError";
import { authOptions } from "@/lib/auth";
import type { RegisterUserSkillDto } from "@/schemas/userSkillSchema";

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

const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return { headers, userId };
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

export const registerUserSkillRepo = async (data: RegisterUserSkillDto) => {
  const { headers, userId } = await getAuthSession();

  const requestBody = {
    skill: {
      skill_id: data.skill_id,
      rating: data.rating,
      description: data.description,
    },
  };

  const res = await fetch(`${getBaseUrl()}/users/${userId}/skills`, {
    method: "POST",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify(requestBody),
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

export const deleteUserSkillRepo = async (userSkillId: string) => {
  const { headers, userId } = await getAuthSession();

  const res = await fetch(
    `${getBaseUrl()}/users/${userId}/skills/${userSkillId}`,
    {
      method: "DELETE",
      headers: { ...headers },
    },
  );

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }
};
