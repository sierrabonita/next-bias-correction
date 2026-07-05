import { InfrastructureError } from "@/errors/InfrastructureError";
import { getAuthSession } from "@/repositories/utils/session";
import type { CreateSkillDto } from "@/schemas/skillSchema";

const getBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL が定義されていません");
  }
  return baseUrl;
};

export const getSkillsRepo = async ({
  excludeLoginUserSkills = false,
}: {
  excludeLoginUserSkills?: boolean;
} = {}) => {
  const { headers, userId } = await getAuthSession();

  const url = `${getBaseUrl()}/skills`;
  const query = new URLSearchParams();
  if (excludeLoginUserSkills && userId) {
    query.set("exclude_user_id", userId);
  }

  const res = await fetch(`${url}?${query}`, {
    headers: { ...headers },
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
  const { headers } = await getAuthSession();
  const res = await fetch(`${getBaseUrl()}/skills`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...headers,
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
  const { headers } = await getAuthSession();
  const res = await fetch(`${getBaseUrl()}/skills/${id}`, {
    method: "DELETE",
    headers: { ...headers },
  });

  if (!res.ok) {
    throw new InfrastructureError(
      res.status,
      `Infrastructure Error: ${res.status}`,
    );
  }
};
