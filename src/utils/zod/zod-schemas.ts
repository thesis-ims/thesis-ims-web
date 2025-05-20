import { z } from "zod";

export const loginSchema = z.object({
  username: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  password: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
});

export const registerSchema = z.object({
  email: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  username: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  password: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  gender: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  phoneNumber: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  dob: z.number({ message: "Wajib diisi" }),
});

export const addProductSchema = z.object({
  name: z
    .string({ message: "nama produk tidak boleh kosong" })
    .min(5, { message: "nama barang minimal harus memiliki 5 karakter" }),
  quantity: z
    .number({ message: "kuantitas barang tidak boleh 0" })
    .min(1, { message: "kuantitas barang tidak boleh 0" }),
  images: z
    .array(z.string(), { message: "produk harus memiliki minimal 1 gambar" })
    .min(1, { message: "produk harus memiliki minimal 1 gambar" }),
});
