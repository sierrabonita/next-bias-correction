import {
  createSkillRepo,
  deleteSkillRepo,
  fetchAllSkills,
} from "@/repositories/skillRepository";
import type { CreateSkillDto } from "@/schemas/skillSchema";

// TODO: エラーハンドリングの実装
export const getAllSkills = async () => {
  const skills = await fetchAllSkills();

  return skills;
};

export const createSkillService = async (data: CreateSkillDto) => {
  return await createSkillRepo(data);
};

export const deleteSkillService = async (id: string) => {
  return await deleteSkillRepo(id);
};
