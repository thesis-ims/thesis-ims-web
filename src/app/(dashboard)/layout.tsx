import Sidebar from "@/components/layouts/sidebar";
import React, { ReactNode } from "react";

export default function DashboardViewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-screen">
      <Sidebar />
      <div className="bg-gray-10 w-full px-20 py-12">{children}</div>
    </div>
  );
}
