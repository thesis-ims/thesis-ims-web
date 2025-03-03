import { LoginAPIResponse } from "@/interfaces/auth";
import { getUserbyUserId, getUserProfile } from "@/lib/api/profile";
import { cookies } from "next/headers";
import Image from "next/image";
import Homepage from "./homepage";
import { getSession } from "@/lib/auth/get-session";
import { ProfileProps } from "@/interfaces/profile";

export default async function Home() {
  const profile = await getUserProfile();

  return <Homepage profile={profile.data} />;
}
