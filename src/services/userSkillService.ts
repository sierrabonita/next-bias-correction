import { getUserSkillsByIdRepo } from "@/repositories/userSkillRepository";

export const getUserSkillsByIdService = async (id: string) => {
  const userSkills = await getUserSkillsByIdRepo(id);

  return userSkills;
};
