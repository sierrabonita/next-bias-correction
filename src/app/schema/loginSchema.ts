import * as z from "zod";

const loginSchema = z.object({
  email: z.email(),
  password: z.string().min(1).max(8),
});

export default loginSchema;
