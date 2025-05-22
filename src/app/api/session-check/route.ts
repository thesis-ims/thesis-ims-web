import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET() {
  const cookie = cookies().get("session");
  return NextResponse.json({ valid: !!cookie });
}
