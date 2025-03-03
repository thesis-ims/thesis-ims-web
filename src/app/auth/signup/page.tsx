import { LoginAPIResponse } from "@/interfaces/auth";
import { getSession } from "@/lib/auth/get-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";

function Signup() {
  const session = getSession();
  if (session) {
    redirect("/");
  }
  return <div>Signup</div>;
}

export default Signup;
