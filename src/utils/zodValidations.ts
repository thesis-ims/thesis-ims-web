import { FormDataErrorProps } from "@/interfaces/auth";
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

export function getZodErrorMessage({
  path,
  errors,
}: {
  path: string;
  errors: FormDataErrorProps[];
}) {
  const errorMessages = errors.map((error) => {
    if (path === error.path) {
      return error.message;
    }
  });
  if (errorMessages.length > 0) {
    return errorMessages as string[];
  } else {
    return null;
  }
}
