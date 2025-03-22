import { redirect } from "next/navigation";
import LoginForm from "./components/login-form";
import { getSession } from "@/lib/auth/get-session";

export default function Login() {
  const session = getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="flex h-screen w-full items-center justify-center bg-gray-10">
      <LoginForm />
    </div>
  );
}
