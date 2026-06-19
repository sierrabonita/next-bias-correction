import { getUserSkillsByIdRepo } from "@/repositories/userSkillRepository";

export const getUserSkillsByIdService = async (id: string, page: string = "1") => {
  const userSkills = await getUserSkillsByIdRepo(id, page);

  return userSkills;
};
