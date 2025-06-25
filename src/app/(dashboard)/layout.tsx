import ClientLayout from "@/components/layouts/client-layout";
import Sidebar from "@/components/layouts/sidebar";
import { getUserProfile } from "@/lib/api/profile";
import { getSession } from "@/lib/auth/get-session";
import { redirect } from "next/navigation";
import React, { ReactNode } from "react";

export default async function DashboardViewLayout({
  children,
}: {
  children: ReactNode;
}) {
  const session = await getSession();
  if (!session?.userId) {
    redirect("/auth/login");
  }
  const profile = await getUserProfile();
  return (
    <div className="bg-gray-10 flex min-h-screen">
      <Sidebar profile={profile.data} />
      <ClientLayout>{children}</ClientLayout>
    </div>
  );
}
