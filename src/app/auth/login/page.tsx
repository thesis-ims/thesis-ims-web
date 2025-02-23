"use client";

import { loginSchema } from "@/utils/zodValidations";
import { useState } from "react";

interface FormDataProps {
  email: string;
  password: string;
}

function Login() {
  const [formData, setFormData] = useState<FormDataProps>({} as FormDataProps);
  const [error, setError] = useState<any>({});

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  function handleSubmitLoginForm() {
    const validationResult = loginSchema.safeParse(formData);
    console.log(validationResult, "validate");

    if (validationResult.success) {
      console.log("success parse");
    } else {
      console.log("failed parse");
      console.log(validationResult.error.errors);
    }
  }

  return (
    <div className="flex flex-col gap-1">
      <h1>Login Page</h1>

      <input
        name="email"
        type="text"
        placeholder="enter email"
        value={formData.email}
        onChange={handleOnChangeInput}
      />

      <input
        name="password"
        type="password"
        placeholder="enter password"
        value={formData.password}
        onChange={handleOnChangeInput}
      />

      <button className="bg-red-500 w-20 h-10" onClick={handleSubmitLoginForm}>
        submit
      </button>
    </div>
  );
}

export default Login;
