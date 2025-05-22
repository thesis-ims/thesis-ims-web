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
        <Button
          onClick={() => {
            logout();
          }}
        >
          logout
        </Button>
      </div>

      {/* USER DATA */}
      <div className="flex flex-col gap-2">
        <p>
          welcome <span className="font-bold">{profile?.username}</span>
        </p>
      </div>
    </div>
  );
}
