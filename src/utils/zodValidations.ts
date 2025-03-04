import { z } from "zod";

export const loginSchema = z.object({
  username: z.string().min(1, { message: "Wajib diisi" }),
  password: z.string().min(1, { message: "Wajib diisi" }),
});

export const registerSchema = z.object({
  email: z.string().min(1, { message: "Wajib diisi" }),
  username: z.string().min(1, { message: "Wajib diisi" }),
  password: z.string().min(1, { message: "Wajib diisi" }),
  gender: z.string().min(1, { message: "Wajib diisi" }),
  phoneNumber: z.string().min(1, { message: "Wajib diisi" }),
  dob: z.string().min(1, { message: "Wajib diisi" }),
});
