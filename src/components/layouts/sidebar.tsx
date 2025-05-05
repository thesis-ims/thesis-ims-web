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
  {
    label: "Stocks",
    href: "/stocks",
  },
  {
    label: "Orders",
    href: "/products",
  },
];

function SidebarItem({ item }: { item: SidebarItem }) {
  return (
    <Link className="w-full py-4 text-center" href={item.href}>
      {item.label}
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="mt-12 flex h-screen flex-col items-center gap-12">
      <div className="mx-12 h-[10rem] w-[12.5rem] bg-red-200" />
      <div className="flex w-full flex-col">
        {sidebarItems.map((item) => {
          return <SidebarItem item={item} />;
        })}
      </div>
    </div>
  );
}
