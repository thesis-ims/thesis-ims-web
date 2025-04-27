import Sidebar from "@/components/layouts/sidebar";
import React, { ReactNode } from "react";

export default function DashboardViewLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="flex w-screen flex-row">
      <Sidebar />
      <div>{children}</div>
    </div>
  );
}
