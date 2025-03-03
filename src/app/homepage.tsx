"use client";

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
    <div className="flex flex-col gap-5">
      {profile?.id ? (
        <button
          onClick={() => {
            logout();
          }}
        >
          logout
        </button>
      ) : (
        <Link href={"/auth/login"}>
          <button>login</button>
        </Link>
      )}

      <div>ini homepage</div>
      <p>
        welcome <span className="font-bold">{profile?.username}</span>
      </p>
      <p>{JSON.stringify(profile)}</p>
    </div>
  );
}
