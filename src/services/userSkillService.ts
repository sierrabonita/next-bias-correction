import { getUserSkillsByIdRepo } from "@/repositories/userSkillRepository";

export const getUserSkillsByIdService = async (id: string) => {
  const skills = await getUserSkillsByIdRepo(id);

  return skills;
};
