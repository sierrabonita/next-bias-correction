import { z } from "zod";

export const registerUserSkillSchema = z.object({
  skill_id: z.number().min(1, "スキルを選択してください"),
  rating: z.number().min(1).max(5),
  description: z
    .string()
    .max(100, "説明は100文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

export type RegisterUserSkillDto = z.infer<typeof registerUserSkillSchema>;
