import { fetchAllSkills } from "@/repositories/skillRepository";

// TODO: エラーハンドリングの実装
export const getAllSkills = async () => {
  const skills = await fetchAllSkills();

  return skills;
};
