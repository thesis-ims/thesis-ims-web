"use client";

import Button from "@/components/ui/button";
import CalenderDatePicker from "@/components/ui/calender-date-picker";
import InputText from "@/components/ui/input-text";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import SnackbarToast from "@/components/ui/snackbar-toast";
import { FormDataErrorProps, RegisterBodyProps } from "@/interfaces/auth";
import { register } from "@/lib/api/auth";
import { getZodErrorMessage, registerSchema } from "@/utils/zodValidations";
import dayjs from "dayjs";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

const genderList = [
  { label: "Male", value: "male" },
  { label: "Female", value: "female" },
];

export default function RegisterForm() {
  const [open, setOpen] = useState(false);
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
    <>
      <div className="flex h-fit w-fit flex-col gap-6 border border-gray-20 bg-white p-20">
        <div>
          <h1 className="text-[42px] font-bold">Sign Up</h1>
        </div>

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

          <div className="w-1/2 border-b border-gray-20 pb-6">
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
      <SnackbarToast open={open} setOpen={setOpen} />
    </>
  );
}
