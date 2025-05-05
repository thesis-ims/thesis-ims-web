"use server";

import { cookies } from "next/headers";
import { LoginAPIResponse } from "@/interfaces/auth";

export async function getSession() {
  const cookie = cookies();
  const session = cookie.get("session")?.value;

  if (!session) return null;

  try {
    return JSON.parse(session) as LoginAPIResponse;
  } catch (error) {
    console.error("Invalid session data:", error);
    return null;
  }
}
