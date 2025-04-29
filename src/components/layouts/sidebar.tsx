import Link from "next/link";
import React from "react";

interface SidebarItem {
  label: string;
  href: string;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
  },
  {
    label: "Products",
    href: "/products",
  },
];

function SidebarItem({ item }: { item: SidebarItem }) {
  return (
    <Link className="w-full" href={item.href}>
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="flex flex-col gap-12 bg-blue-200">
      <div className="mx-12 h-12 w-12 bg-red-200" />
      <div className="flex flex-col">
        {sidebarItems.map((item) => {
          return <SidebarItem item={item} />;
        })}
      </div>
    </div>
  );
}
