import * as z from "zod";

const PASSWORD_MIN_LENGTH = 8;
const PASSWORD_MAX_LENGTH = 100;

const loginSchema = z.object({
  email: z.email(),
  password: z
    .string()
    .min(
      PASSWORD_MIN_LENGTH,
      `パスワードは ${PASSWORD_MIN_LENGTH} 文字以上である必要があります`,
    )
    .max(PASSWORD_MAX_LENGTH, `パスワードが長すぎます`)
    .regex(/[a-z]/, "小文字を含めてください")
    .regex(/[A-Z]/, "大文字を含めてください")
    .regex(/[0-9]/, "数字を含めてください")
    .regex(/[^a-zA-Z0-9]/, "記号を含めてください"),
});

export default loginSchema;
