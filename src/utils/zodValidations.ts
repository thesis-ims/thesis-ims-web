import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Wajib diisi" }),
  password: z.string().min(1, { message: "Wajib diisi" }),
});

export const registerSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  username: z.string(),
  password: z.string(),
});
