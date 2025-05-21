// components/layouts/ClientLayout.tsx
"use client";

import { SessionObserver } from "./session-observer";

export default function ClientLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SessionObserver />
      <div className="bg-gray-10 flex-1 p-6">{children}</div>
    </>
  );
}
