import {
  createSkillRepo,
  deleteSkillRepo,
} from "@/repositories/skillRepository";
import type { CreateSkillDto } from "@/schemas/skillSchema";

export const createSkillService = async (data: CreateSkillDto) => {
  return await createSkillRepo(data);
};

export const deleteSkillService = async (id: string) => {
  return await deleteSkillRepo(id);
};
