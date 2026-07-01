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

const getAuthSession = async () => {
  const session = await getServerSession(authOptions);
  const token = session?.user?.accessToken;
  const userId = session?.user?.id;

  const headers: Record<string, string> = token
    ? { Authorization: `Bearer ${token}` }
    : {};

  return { headers, userId };
};

export const getSkillsRepo = async ({
  excludeLoginUserSkills = false,
}: {
  excludeLoginUserSkills?: boolean;
} = {}) => {
  const { headers: authHeaders, userId } = await getAuthSession();

  const url = `${getBaseUrl()}/skills`;
  const query = new URLSearchParams();
  if (excludeLoginUserSkills && userId) {
    query.set("exclude_user_id", userId);
  }

  const res = await fetch(`${url}?${query}`, {
    headers: { ...authHeaders },
  });

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }

  return res.json();
};

export const createSkillRepo = async (data: CreateSkillDto) => {
  const { headers: authHeaders } = await getAuthSession();
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
  const { headers: authHeaders } = await getAuthSession();
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
