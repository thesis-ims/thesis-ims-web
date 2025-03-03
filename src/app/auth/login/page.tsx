import { LoginAPIResponse } from "@/interfaces/auth";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import LoginForm from "./components/login-form";

export default function Login() {
  const cookie = cookies();
  const session: LoginAPIResponse = JSON.parse(cookie.get("session")?.value!);

  if (session) {
    redirect("/");
  }
  return <LoginForm />;
}
