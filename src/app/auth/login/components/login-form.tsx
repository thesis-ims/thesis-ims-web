"use client";

import Button from "@/components/ui/button";
import InputText from "@/components/ui/input-text";
import { FormDataErrorProps, LoginBodyProps } from "@/interfaces/auth";
import { login } from "@/lib/api/auth";
import { setAuthCookie } from "@/lib/auth/auth-cookie-handler";
import { getZodErrorMessage, loginSchema } from "@/utils/zodValidations";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

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
      toast.error("Lengkapi Form Pengisian");
      return;
    }

    // continue to login flow API
    setErrors([]);
    const loginResponse = await login(formData);
    if (loginResponse.error) {
      toast.error(loginResponse.message);
      return;
    }

    toast.success(loginResponse.message);
    await setAuthCookie(loginResponse.data);
    router.push("/");
  }

  return (
    <div className="border-gray-20 flex h-fit w-fit flex-col items-center justify-center gap-6 border bg-white p-20">
      {/* login page header */}

      <div className="flex flex-col items-center gap-2">
        <h1 className="text-[42px] font-bold">Welcome Back</h1>
        <p className="text-lg">Please log in to continue</p>
      </div>

      {/* login form */}
      <form
        className="border-gray-20 flex flex-col items-center gap-8 border-b py-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitLoginForm();
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <InputText
            className="w-[520px]"
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
            className="w-[520px]"
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

        <Button
          className="w-full"
          intent={"primary"}
          size={"default"}
          type="submit"
          // onClick={handleSubmitLoginForm}
        >
          Log In
        </Button>
      </form>

      {/* no account yet section */}
      <div className="flex items-center gap-1">
        <p>No account yet?</p>
        <Link href="/auth/register" className="text-[#001D6C]">
          Sign up
        </Link>
      </div>
    </div>
  );
}
