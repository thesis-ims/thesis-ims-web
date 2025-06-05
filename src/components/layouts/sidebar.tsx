"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import {
  CartIcon,
  ClipboardIcon,
  FolderIcon,
  HistoryIcon,
  HomeIcon,
  SettingsIcon,
  StokkuIcon,
  UsersIcon,
} from "../ui/icons";
import { usePathname } from "next/navigation";
import path from "path";

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
    label: "History",
    href: "/history",
    icon: <HistoryIcon className="h-6 w-6" />,
  },

  {
    label: "Settings",
    href: "/settings",
    icon: <SettingsIcon className="h-6 w-6" />,
  },
  // {
  //   label: "Reports",
  //   href: "/reports",
  //   icon: <ClipboardIcon className="h-6 w-6" />,
  // },
  // {
  //   label: "Orders",
  //   href: "/orders",
  //   icon: <CartIcon className="h-6 w-6" />,
  // },
];

function SidebarItem({ item }: { item: SidebarItem }) {
  const pathName = usePathname();
  return (
    <Link
      className={`border-gray-10 flex w-full items-center gap-2 border-b px-2 py-3 ${pathName === item.href ? "bg-gray-10" : ""} ${(pathName.includes("add-product") || pathName.includes("edit-product")) && item.href === "/inventory" ? "bg-gray-10" : ""}`}
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
      <Link href="/" className="flex items-center gap-3">
        <StokkuIcon className="text-primary-color-1 h-10 w-10" />
        <h1 className="text-primary-color-1 px-2 py-5 text-4xl font-bold">
          Stokku
        </h1>
      </Link>
      <div className="flex w-full flex-col">
        {sidebarItems.map((item, index) => {
          return <SidebarItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
}
