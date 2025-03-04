"use client";

import { FormDataErrorProps, RegisterBodyProps } from "@/interfaces/auth";
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
      <h1>Register Page</h1>

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

      {/* <button className="h-10 w-20 bg-red-500" onClick={handleSubmitLoginForm}>
        submit
      </button> */}
    </div>
  );
}
