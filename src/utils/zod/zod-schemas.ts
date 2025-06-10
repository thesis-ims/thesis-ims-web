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
    .min(1, { message: "Wajib diisi" })
    .email({ message: "Format email tidak valid" }),
  username: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" })
    .max(10, { message: "Maksimal 10 karakter" }),
  password: z
    .string({ message: "Wajib diisi" })
    .min(8, { message: "Password harus memiliki minimal 8 karakter" })
    .regex(/^(?=.*[a-zA-Z])(?=.*\d).{8,}$/, {
      message: "Password harus mengandung kombinasi minimal 8 huruf dan angka",
    }),
  gender: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  phoneNumber: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  dob: z.number({ message: "Wajib diisi" }),
});
export const changePasswordSchema = z.object({
  oldPassword: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  newPassword: z
    .string({ message: "Wajib diisi" })
    .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
  newPasswordConfirmation: z
    .string({ message: "Wajib diisi" })
    .min(8, { message: "Password harus memiliki minimal 8 karakter" }),
});

export const userUpdateSchema = z.object({
  email: z
    .string({ message: "Wajib diisi" })
    .min(1, { message: "Wajib diisi" }),
  username: z
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
  category: z
    .string({ message: "kategori produk harus diisi" })
    .min(1, { message: "kategori produk harus diisi" }),
  quantity: z
    .number({ message: "kuantitas barang harus diisi" })
    .min(0, { message: "kuantitas barang harus diisi" }),
  buyPrice: z
    .number({ message: "harga barang harus diisi" })
    .min(1, { message: "harga barang tidak boleh 0" }),
  sellPrice: z
    .number({ message: "harga barang harus diisi" })
    .min(1, { message: "harga barang tidak boleh 0" }),
  // images: z
  //   .array(z.string(), { message: "produk harus memiliki minimal 1 gambar" })
  //   .min(1, { message: "produk harus memiliki minimal 1 gambar" }),
});
