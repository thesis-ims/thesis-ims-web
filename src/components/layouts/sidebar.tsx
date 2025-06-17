"use client";

import Link from "next/link";
import React, { ReactNode } from "react";
import {
  CartIcon,
  ClipboardIcon,
  FolderIcon,
  HistoryIcon,
  HomeIcon,
  ProfilePlaceholderIcon,
  SettingsIcon,
  StokkuIcon,
  UsersIcon,
} from "../ui/icons";
import { usePathname } from "next/navigation";
import path from "path";
import { ProfileProps } from "@/interfaces/profile";
import Image from "next/image";
import { base64StringDecoder } from "@/utils/base64-string-encoder";

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
];

function SidebarItem({ item }: { item: SidebarItem }) {
  const pathName = usePathname();
  return (
    <Link
      className={`text-primary-color-1 border-gray-10 flex w-full items-center gap-2 border-b px-2 py-3 ${pathName === item.href ? "bg-gray-10" : ""} ${(pathName.includes("add-product") || pathName.includes("edit-product")) && item.href === "/inventory" ? "bg-gray-10" : ""}`}
      href={item.href}
    >
      {item.icon}
      <p className="font-medium">{item.label}</p>
    </Link>
  );
}

export default function Sidebar({ profile }: { profile: ProfileProps }) {
  return (
    <div className="flex h-screen w-[256px] flex-col items-center gap-4 px-4 py-6">
      <Link href="/" className="flex items-center gap-5 px-2 py-5">
        <StokkuIcon className="text-primary-color-1 h-10 w-10" />
        <h1 className="text-primary-color-1 text-4xl font-bold">Stokku</h1>
      </Link>

      <Link href="/settings" className="flex items-center gap-4 pb-7">
        {profile.image ? (
          <Image
            src={base64StringDecoder(profile.image)}
            alt="profile image"
            className="border-primary-color-1 h-11 w-11 rounded-full border object-cover"
            width={0}
            height={0}
          />
        ) : (
          <div className="border-primary-color-1 bg-gray-10 flex h-11 w-11 items-center justify-center rounded-full border">
            <ProfilePlaceholderIcon className="h-4 w-4 text-gray-50" />
          </div>
        )}

        <p className="text-primary-color-1 text-xl font-medium">
          {profile.username}
        </p>
      </Link>

      <div className="border-gray-10 flex w-full flex-col border-t">
        {sidebarItems.map((item, index) => {
          return <SidebarItem key={index} item={item} />;
        })}
      </div>
    </div>
  );
}
