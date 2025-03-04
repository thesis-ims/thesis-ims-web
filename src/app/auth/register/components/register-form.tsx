"use client";

import InputText from "@/components/ui/input-text";
import { FormDataErrorProps, RegisterBodyProps } from "@/interfaces/auth";
import { getZodErrorMessage } from "@/utils/zodValidations";
import Link from "next/link";
import React, { useState } from "react";

export default function RegisterForm() {
  const [formData, setFormData] = useState<RegisterBodyProps>(
    {} as RegisterBodyProps,
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center gap-5 rounded-md border border-gray-300 p-20">
      <h1>Register Page</h1>

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

      {/* <button className="h-10 w-20 bg-red-500" onClick={handleSubmitLoginForm}>
      Register
    </button> */}

      <div className="flex items-center gap-1">
        <p>Already have account?</p>
        <Link href="/auth/login">Log In</Link>
      </div>
    </div>
  );
}
