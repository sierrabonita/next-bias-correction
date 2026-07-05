"use server";

import { revalidatePath } from "next/cache";
import type { RegisterUserSkillDto } from "@/schemas/userSkillSchema";
import {
  createUserSkillService,
  deleteUserSkillService,
} from "@/services/userSkillService";

export const createUserSkillAction = async (data: RegisterUserSkillDto) => {
  const res = await createUserSkillService(data);

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
