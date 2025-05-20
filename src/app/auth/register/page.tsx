import { LoginAPIResponse } from "@/interfaces/auth";
import { getSession } from "@/lib/auth/get-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import React from "react";
import RegisterForm from "./components/register-form";

async function Register() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-gray-10 flex h-screen w-full items-center justify-center">
      <RegisterForm />
    </div>
  );
}

export default Register;
