// TODO: new Error をカスタムエラークラスに置き換える
import type { CreateSkillDto } from "@/schemas/skillSchema";

const getBaseUrl = () => {
  const baseUrl = process.env.API_BASE_URL;
  if (!baseUrl) {
    throw new Error("API_BASE_URL が定義されていません");
  }
  return baseUrl;
};

export const fetchAllSkills = async () => {
  const res = await fetch(`${getBaseUrl()}/skills`, { cache: "no-store" });

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error("Infrastructure Error");
  }

  return res.json();
};

export const createSkillRepo = async (data: CreateSkillDto) => {
  const res = await fetch(`${getBaseUrl()}/skills`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  });

  if (!res.ok) {
    throw new Error("Infrastructure Error");
  }

  return res.json();
};
