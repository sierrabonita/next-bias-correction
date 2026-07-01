"use server";

import { revalidatePath } from "next/cache";
import type { CreateSkillDto } from "@/schemas/skillSchema";
import {
  createSkillService,
  deleteSkillService,
  getAllSkillsService,
} from "@/services/skillService";

export const getAllSkillsAction = async ({
  excludeLoginUserSkills = false,
}: {
  excludeLoginUserSkills?: boolean;
} = {}) => {
  return await getAllSkillsService({ excludeLoginUserSkills });
};

export const createSkillAction = async (data: CreateSkillDto) => {
  const res = await createSkillService(data);

  // 一覧画面更新
  revalidatePath("/skills");

  return res;
};

export const deleteSkillAction = async (id: string) => {
  await deleteSkillService(id);

  // 一覧画面更新
  revalidatePath("/skills");
};
