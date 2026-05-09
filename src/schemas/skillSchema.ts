import { z } from "zod";

export const skillSchema = z.object({
  name: z
    .string()
    .min(1, "名前を入力してください")
    .max(20, "20文字以内で入力してください"),
  rating: z.number().min(1).max(5),
  category: z.string().min(1, "カテゴリを選択してください"),
  description: z
    .string()
    .max(100, "説明は100文字以内で入力してください")
    .optional()
    .or(z.literal("")),
});

export type CreateSkillDto = z.infer<typeof skillSchema>;
