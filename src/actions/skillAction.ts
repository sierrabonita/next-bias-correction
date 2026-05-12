"use server";

import { revalidatePath } from "next/cache";
import type { CreateSkillDto } from "@/schemas/skillSchema";
import {
  createSkillService,
  deleteSkillService,
} from "@/services/skillService";

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
