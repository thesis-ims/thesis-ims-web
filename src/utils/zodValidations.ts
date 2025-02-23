import { z } from "zod";

export const loginSchema = z.object({
  email: z.string().min(1, { message: "Wajib diisi" }),
  password: z.string().min(1, { message: "Wajib diisi" }),
});

export const registerSchema = z.object({
  name: z.string(),
  phoneNumber: z.string(),
  email: z.string(),
  password: z.string(),
});
