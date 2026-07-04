import {
  deleteUserSkillRepo,
  getUserSkillsByIdRepo,
  registerUserSkillRepo,
} from "@/repositories/userSkillRepository";
import type { RegisterUserSkillDto } from "@/schemas/userSkillSchema";

export const getUserSkillsByIdService = async (
  id: string,
  page: string = "1",
) => {
  const userSkills = await getUserSkillsByIdRepo(id, page);

  return userSkills;
};

export const registerUserSkillService = async (data: RegisterUserSkillDto) => {
  return registerUserSkillRepo(data);
};

export const deleteUserSkillService = async (userSkillId: string) => {
  return deleteUserSkillRepo(userSkillId);
};
