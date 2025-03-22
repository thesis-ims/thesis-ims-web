"use client";

import Button from "@/components/ui/button";
import CalenderDatePicker from "@/components/ui/calender-date-picker";
import InputText from "@/components/ui/input-text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { FormDataErrorProps, RegisterBodyProps } from "@/interfaces/auth";
import { register } from "@/lib/api/auth";
import { getZodErrorMessage, registerSchema } from "@/utils/zodValidations";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function RegisterForm() {
  const genderList = [
    { label: "Male", value: "male" },
    { label: "Female", value: "female" },
  ];
  const [formData, setFormData] = useState<RegisterBodyProps>({
    username: "",
    email: "",
    password: "",
    phoneNumber: "",
    gender: "",
  } as RegisterBodyProps);

  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  const router = useRouter();

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitRegisterForm() {
    const validationResult = registerSchema.safeParse(formData);

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

    setErrors([]);
    const registerResponse = await register(formData);
    if (registerResponse.error) {
      alert(registerResponse.message);
      return;
    }

    alert(registerResponse.message);
    router.push("/auth/login");
  }

  return (
    <div className="flex h-fit w-fit flex-col items-center justify-center gap-6 rounded-md border border-gray-20 bg-white p-20">
      <div>
        <h1 className="text-[42px] font-bold">Sign Up</h1>
      </div>

      {/* {JSON.stringify(formData)} */}

      <form
        className="flex flex-col items-center gap-4 py-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitRegisterForm();
        }}
      >
        <div className="grid grid-cols-2 gap-4">
          <InputText
            className="w-[520px]"
            label="Email"
            name="email"
            placeholder="enter email"
            value={formData.email}
            onChange={handleOnChangeInput}
            errorMessages={getZodErrorMessage({
              errors: errors,
              path: "email",
            })}
          />

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
            helperText="It must be a combination of minimum 8 letters, numbers, and symbols."
          />

          <InputText
            className="w-[520px]"
            label="Phone Number"
            name="phoneNumber"
            placeholder="enter phone number"
            value={formData.phoneNumber}
            onChange={handleOnChangeInput}
            errorMessages={getZodErrorMessage({
              errors: errors,
              path: "phoneNumber",
            })}
          />

          <div className="flex flex-col gap-2">
            <RadioGroup
              defaultValue={formData.gender}
              onValueChange={(gender) => {
                setFormData((prev) => {
                  return {
                    ...prev,
                    gender: gender,
                  };
                });
              }}
            >
              {genderList.map((gender) => {
                return (
                  <div className="flex items-center gap-2">
                    <RadioGroupItem value={gender.value} />
                    <p>{gender.label}</p>
                  </div>
                );
              })}
            </RadioGroup>

            <p className="text-red-500">
              {getZodErrorMessage({ errors: errors, path: "gender" })}
            </p>
          </div>

          <div className="flex flex-col gap-2">
            <CalenderDatePicker
              value={dayjs(formData.dob)}
              setValue={(data) =>
                setFormData((prev) => ({ ...prev, dob: data }))
              }
            />

            <p className="text-red-500">
              {getZodErrorMessage({ errors: errors, path: "dob" })}
            </p>
          </div>
        </div>

        <Button
          className="w-full"
          intent={"primary"}
          size={"default"}
          type="submit"
        >
          Register
        </Button>
      </form>

      <div className="flex items-center gap-1">
        <p>Already have account?</p>
        <Link href="/auth/login">Log In</Link>
      </div>
    </div>
  );
}
