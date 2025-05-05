import Sidebar from "@/components/layouts/sidebar";
import React, { ReactNode } from "react";

export default function DashboardViewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <div className="bg-gray-10 flex-1 py-12">{children}</div>
    </div>
  );
}
