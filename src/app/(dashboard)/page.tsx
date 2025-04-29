import { LoginAPIResponse } from "@/interfaces/auth";
import { getUserbyUserId, getUserProfile } from "@/lib/api/profile";
import { cookies } from "next/headers";
import Image from "next/image";
import { getSession } from "@/lib/auth/get-session";
import { ProfileProps } from "@/interfaces/profile";
import Homepage from "../homepage";

export default async function Home() {
  const profile = await getUserProfile();

  return <Homepage profile={profile.data} />;
}
