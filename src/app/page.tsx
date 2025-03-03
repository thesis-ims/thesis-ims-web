import { LoginAPIResponse } from "@/interfaces/auth";
import { getUserbyUserId } from "@/lib/api/profile";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const cookie = cookies();
  const session: LoginAPIResponse = JSON.parse(cookie.get("session")?.value!);
  const profile = await getUserbyUserId(session.userId);
  return (
    <div className="flex gap-5 flex-col">
      <div>ini homepage</div>
      <p>{JSON.stringify(session.token)}</p>
      <p>{JSON.stringify(profile)}</p>
    </div>
  );
}
