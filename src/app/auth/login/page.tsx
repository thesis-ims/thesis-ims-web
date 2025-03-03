"use client";

import { LoginBodyProps } from "@/interfaces/auth";
import { login } from "@/lib/auth";
import { loginSchema } from "@/utils/zodValidations";
import { error } from "console";
import { useState } from "react";
import { ZodIssueBase } from "zod";

interface FormDataErrorProps {
  path: string;
  message: string;
}

function Login() {
  const [formData, setFormData] = useState<LoginBodyProps>(
    {} as LoginBodyProps
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[]
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
        }
      );
      setErrors(issues);
      return;
    }

    // continue to login flow API
    setErrors([]);
    const loginResponse = await login(formData);

    alert(loginResponse.message);
  }

  function getZodErrorMessage(path: string) {
    const errorMessages = errors.map((error) => {
      if (path === error.path) {
        return error.message as string;
      }
    });
    return errorMessages;
  }

  return (
    <div className="flex flex-col gap-1">
      <h1>Login Page</h1>

      <input
        name="username"
        type="text"
        placeholder="enter email"
        value={formData.username}
        onChange={handleOnChangeInput}
      />
      <p>{getZodErrorMessage("username")}</p>

      <input
        name="password"
        type="password"
        placeholder="enter password"
        value={formData.password}
        onChange={handleOnChangeInput}
      />
      <p>{getZodErrorMessage("password")}</p>

      <button className="bg-red-500 w-20 h-10" onClick={handleSubmitLoginForm}>
        submit
      </button>
    </div>
  );
}

export default Login;
