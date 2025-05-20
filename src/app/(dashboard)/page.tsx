import { getUserProfile } from "@/lib/api/profile";
import Homepage from "../homepage";
import { redirect } from "next/navigation";

export default async function Home() {
  const profile = await getUserProfile();
  if (profile.error || Object.keys(profile.data).length === 0) {
    redirect("/auth/login");
  }

  return <Homepage profile={profile.data} />;
}
