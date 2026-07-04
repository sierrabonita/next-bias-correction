"use server";

import { revalidatePath } from "next/cache";
import type { RegisterUserSkillDto } from "@/schemas/userSkillSchema";
import {
  deleteUserSkillService,
  registerUserSkillService,
} from "@/services/userSkillService";

export const registerUserSkillAction = async (data: RegisterUserSkillDto) => {
  const res = await registerUserSkillService(data);

  // 一覧画面更新
  revalidatePath("/skills");

  return res;
};

export const deleteUserSkillAction = async (userSkillId: string) => {
  const res = await deleteUserSkillService(userSkillId);

  // 一覧画面更新
  revalidatePath("/skills");

  return res;
};
