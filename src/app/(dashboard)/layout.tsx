import Sidebar from "@/components/layouts/sidebar";
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
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-gray-10 flex-1 p-6">{children}</div>
    </div>
  );
}
