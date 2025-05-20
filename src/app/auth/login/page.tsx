import { redirect } from "next/navigation";
import LoginForm from "./components/login-form";
import { getSession } from "@/lib/auth/get-session";

export default async function Login() {
  const session = await getSession();
  if (session) {
    redirect("/");
  }
  return (
    <div className="bg-gray-10 flex h-screen w-full items-center justify-center">
      <LoginForm />
    </div>
  );
}
