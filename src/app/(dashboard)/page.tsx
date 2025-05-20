import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await getUserProfile();

  return <Homepage profile={profile.data} />;
}
