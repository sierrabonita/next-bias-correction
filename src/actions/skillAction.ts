"use server";

import { revalidatePath } from "next/cache";
import type { CreateSkillDto } from "@/schemas/skillSchema";
import { createSkillService } from "@/services/skillService";

export const createSkillAction = async (data: CreateSkillDto) => {
  const res = await createSkillService(data);

  // 一覧画面更新
  revalidatePath("/skills");

  return res;
};
