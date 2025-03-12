"use client";

import InputText from "@/components/ui/input-text";
import { FormDataErrorProps, LoginBodyProps } from "@/interfaces/auth";
import { login } from "@/lib/api/auth";
import { setAuthCookie } from "@/lib/auth/auth-cookie-handler";
import { getZodErrorMessage, loginSchema } from "@/utils/zodValidations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<LoginBodyProps>(
    {} as LoginBodyProps,
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitLoginForm() {
    const validationResult = loginSchema.safeParse(formData);

    if (!validationResult.success) {
      const issues: FormDataErrorProps[] = validationResult.error.issues.map(
        (issue) => {
          return {
            path: issue.path[0] as string,
            message: issue.message,
          };
        },
      );
      setErrors(issues);
      alert("lengkapi form data");
      return;
    }

    // continue to login flow API
    setErrors([]);
    const loginResponse = await login(formData);
    if (loginResponse.error) {
      alert(loginResponse.message);
      return;
    }

    alert(loginResponse.message);
    await setAuthCookie(loginResponse.data);
    router.push("/");
  }

  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center gap-5 rounded-md border border-gray-300 p-20">
      <h1>Login Page</h1>

      <div className="flex flex-col items-center gap-4">
        <InputText
          label="Username"
          name="username"
          placeholder="enter username"
          value={formData.username}
          onChange={handleOnChangeInput}
          errorMessages={getZodErrorMessage({
            errors: errors,
            path: "username",
          })}
        />

        <InputText
          label="Password"
          isPassword={true}
          name="password"
          placeholder="enter password"
          value={formData.password}
          onChange={handleOnChangeInput}
          errorMessages={getZodErrorMessage({
            errors: errors,
            path: "password",
          })}
        />
      </div>

      <button className="h-10 w-20 bg-red-500" onClick={handleSubmitLoginForm}>
        Log In
      </button>

      <div className="flex items-center gap-1">
        <p>No account yet?</p>
        <Link href="/auth/register">Sign up</Link>
      </div>
    </div>
  );
}
