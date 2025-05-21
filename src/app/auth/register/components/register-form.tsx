"use client";

import { Button } from "@/components/ui/button";
import CalenderDatePicker from "@/components/ui/calender-date-picker";
import InputText from "@/components/ui/input-text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { UserProfileProps } from "@/interfaces/auth";
import { register } from "@/lib/api/auth";
import { userFormSchema } from "@/utils/zod/zod-schemas";
import {
  FormDataErrorProps,
  getZodErrorMessage,
  parseZodIssue,
} from "@/utils/zod/zod-utils";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export const genderList = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function RegisterForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<UserProfileProps>(
    {} as UserProfileProps,
  );

  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitRegisterForm() {
    const validationResult = userFormSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi Form Pengisian");
      return;
    }

    setErrors([]);
    const registerResponse = await register(formData);
    if (registerResponse.error) {
      toast.error(registerResponse.message);
      return;
    }

    toast.success(registerResponse.message);
    router.push("/auth/login");
  }

  return (
    <>
      <div className="border-gray-20 flex h-fit w-fit flex-col gap-6 border bg-white p-20">
        <h1 className="text-[42px] font-bold">Sign Up</h1>

        {/* {JSON.stringify(formData)} */}

        <form
          className="flex flex-col items-center gap-8 pt-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmitRegisterForm();
          }}
        >
          <div className="grid grid-cols-2 gap-x-20 gap-y-4">
            <InputText
              label="Email"
              name="email"
              className="w-[520px]"
              placeholder="enter email"
              value={formData.email}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "email",
              })}
            />

            <InputText
              label="Username"
              name="username"
              className="w-[520px]"
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
              name="password"
              isPassword={true}
              className="w-[520px]"
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
              label="Phone Number"
              name="phoneNumber"
              className="w-[520px]"
              placeholder="enter phone number"
              value={formData.phoneNumber}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "phoneNumber",
              })}
            />

            {/* gender */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Gender</p>
              <div className="flex flex-col gap-1">
                <RadioGroup
                  className="flex flex-row gap-8"
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
            </div>

            {/* calendar DOB date picker */}
            <div className="flex flex-col gap-2">
              <p className="text-sm text-black">Date of Birth</p>
              <div className="flex flex-col gap-1">
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
          </div>

          <div className="border-gray-20 w-1/2 border-b pb-6">
            <Button
              className="w-full"
              intent={"primary"}
              size={"default"}
              type="submit"
            >
              Register
            </Button>
          </div>
        </form>

        <div className="flex w-full items-center justify-center gap-1">
          <p>Already have account?</p>
          <Link href="/auth/login" className="text-[#001D6C]">
            Log In
          </Link>
        </div>
      </div>
    </>
  );
}
