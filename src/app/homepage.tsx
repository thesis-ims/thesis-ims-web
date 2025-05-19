"use client";

import { Button } from "@/components/ui/button";
import { LoginAPIResponse } from "@/interfaces/auth";
import { ProfileProps } from "@/interfaces/profile";
import { logout } from "@/lib/auth/auth-cookie-handler";
import Link from "next/link";
import React from "react";

export default function Homepage({
  profile,
}: {
  profile: ProfileProps | null;
}) {
  return (
    <div className="flex w-full flex-col gap-5">
      {/* LOGIN LOGOUT BUTTONS */}
      <div className="flex items-center gap-2">
        {profile?.id ? (
          <Button
            onClick={() => {
              logout();
            }}
          >
            logout
          </Button>
        ) : (
          <>
            <Link href={"/auth/login"}>
              <Button>login</Button>
            </Link>

            <Link href={"/auth/register"}>
              <Button>register</Button>
            </Link>
          </>
        )}
      </div>

      {/* USER DATA */}
      <div className="flex flex-col gap-2">
        <p>
          welcome <span className="font-bold">{profile?.username}</span>
        </p>
        <p className="break-all">{JSON.stringify(profile)}</p>
      </div>

      {/* PRODUCTS BUTTONS */}
      <div className="flex items-center justify-between gap-2">
        <Button>Add Product</Button>
        <Button>delete Products</Button>
      </div>
    </div>
  );
}
