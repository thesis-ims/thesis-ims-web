"use server";

import { LoginAPIResponse } from "@/interfaces/auth";
import { cookies } from "next/headers";

export async function setAuthCookie(data: LoginAPIResponse) {
  const cookie = await cookies();
  cookie.set({
    name: "session",
    value: JSON.stringify(data),
    maxAge: 60 * 60 * 3,
    path: "/",
  });
}
