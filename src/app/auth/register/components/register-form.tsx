"use client";

import { Button } from "@/components/ui/button";
import CalenderDatePicker from "@/components/ui/calender-date-picker";
import { StokkuIcon } from "@/components/ui/icons";
import InputText from "@/components/ui/input-text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { RegisterBodyProps } from "@/interfaces/auth";
import { register } from "@/lib/api/auth";
import { registerSchema } from "@/utils/zod/zod-schemas";
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

  async function handleSubmitRegisterForm() {
    const validationResult = registerSchema.safeParse(formData);

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
      <div className="border-gray-20 flex h-screen w-full flex-col gap-10 border bg-white pt-16">
        <div className="flex flex-col items-center gap-2">
          <StokkuIcon className="text-primary-color-60" />
          <h1 className="text-[42px] font-bold">Get Started with Stokku!</h1>
          <p className="text-lg">
            Create your account and manage your inventory with ease!
          </p>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            // handleSubmitRegisterForm();
          }}
          className="mx-auto grid w-fit grid-cols-2 gap-x-14 gap-y-4 pb-6"
        >
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

          <InputText
            label="Username"
            name="username"
            className="w-[520px]"
            placeholder="enter username"
            helperText="maximum 10 characters"
            value={formData.username}
            onChange={handleOnChangeInput}
            errorMessages={getZodErrorMessage({
              errors: errors,
              path: "username",
            })}
          />

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

              <p className="text-xs font-medium text-red-600">
                {getZodErrorMessage({ errors: errors, path: "dob" })}
              </p>
            </div>
          </div>

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
            helperText="It must be a combination of minimum 8 letters and numbers."
          />

          {/* gender */}
          <div className="flex flex-col gap-6">
            <p className="text-sm text-black">Gender</p>
            <div className="flex flex-col gap-2">
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

              <p className="text-xs font-medium text-red-600">
                {getZodErrorMessage({ errors: errors, path: "gender" })}
              </p>
            </div>
          </div>
        </form>

        <div className="flex w-full flex-col items-center justify-center gap-6">
          <div className="border-gray-20 w-1/3 border-b pb-6">
            <Button
              onClick={() => {
                handleSubmitRegisterForm();
              }}
              className="w-full"
              intent={"primary"}
              size={"default"}
              type="submit"
            >
              Register
            </Button>
          </div>
          <div className="flex items-center gap-1">
            <p>Already have account?</p>
            <Link href="/auth/login" className="text-[#001D6C]">
              Log In
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
