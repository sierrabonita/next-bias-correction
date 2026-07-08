import {
  createSkillRepo,
  deleteSkillRepo,
  getSkillsRepo,
} from "@/repositories/skillRepository";
import type { CreateSkillDto, FetchSkill } from "@/schemas/skillSchema";

export const getAllSkillsService = async ({
  excludeLoginUserSkills = false,
}: {
  excludeLoginUserSkills?: boolean;
} = {}): Promise<{ data: FetchSkill[] }> => {
  return await getSkillsRepo({ excludeLoginUserSkills });
};

export const createSkillService = async (data: CreateSkillDto) => {
  return await createSkillRepo(data);
};

export const deleteSkillService = async (id: string) => {
  return await deleteSkillRepo(id);
};
