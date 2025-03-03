import { LoginAPIResponse } from "@/interfaces/auth";
import { getUserbyUserId, getUserProfile } from "@/lib/api/profile";
import { cookies } from "next/headers";
import Image from "next/image";

export default async function Home() {
  const cookie = cookies();
  const session: LoginAPIResponse = JSON.parse(cookie.get("session")?.value!);
  const profile = await getUserProfile();
  return (
    <div className="flex flex-col gap-5">
      <div>ini homepage</div>
      <p>{JSON.stringify(session)}</p>
      <p>{JSON.stringify(profile.data)}</p>
    </div>
  );
}
