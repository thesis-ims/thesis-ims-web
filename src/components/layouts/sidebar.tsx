import Link from "next/link";
import React, { ReactNode } from "react";
import {
  CartIcon,
  ClipboardIcon,
  FolderIcon,
  HomeIcon,
  UsersIcon,
} from "../ui/icons";

interface SidebarItem {
  label: string;
  href: string;
  icon?: ReactNode;
}

const sidebarItems: SidebarItem[] = [
  {
    label: "Dashboard",
    href: "/",
    icon: <HomeIcon className="h-6 w-6" />,
  },
  {
    label: "Inventory",
    href: "/inventory",
    icon: <FolderIcon className="h-6 w-6" />,
  },
  {
    label: "Reports",
    href: "/reports",
    icon: <ClipboardIcon className="h-6 w-6" />,
  },
  {
    label: "Suppliers",
    href: "/supplier",
    icon: <UsersIcon className="h-6 w-6" />,
  },
  {
    label: "Orders",
    href: "/orders",
    icon: <CartIcon className="h-6 w-6" />,
  },
];

function SidebarItem({ item }: { item: SidebarItem }) {
  return (
    <Link
      className="border-gray-10 flex w-full items-center gap-2 border-b px-2 py-3"
      href={item.href}
    >
      {item.icon}
      <p className="font-medium">{item.label}</p>
    </Link>
  );
}

export default function Sidebar() {
  return (
    <div className="flex h-screen w-[256px] flex-col items-center gap-4 px-4 py-6">
      <Link href="/">
        <h1 className="text-gray-60 text-2xl font-bold">Stokku</h1>
      </Link>
      <div className="flex w-full flex-col">
        {sidebarItems.map((item) => {
          return <SidebarItem item={item} />;
        })}
      </div>
    </div>
  );
}
