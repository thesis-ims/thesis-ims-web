import PageHeader from "@/components/ui/page-header";
import React from "react";
import UserDetailForm from "./components/user-detail-form";
import { getUserProfile } from "@/lib/api/profile";

export default async function Settings() {
  const profile = await getUserProfile();
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Settings" />
      <UserDetailForm initProfile={profile.data} />
    </div>
  );
}
