"use client";

import React, { useState } from "react";
import ProfilePhotoSection from "./profile-photo-section";
import { Button } from "@/components/ui/button";
import {
  FormDataErrorProps,
  getZodErrorMessage,
  parseZodIssue,
} from "@/utils/zod/zod-utils";
import { RadioGroupItem } from "@/components/ui/radio-group";
import dayjs from "dayjs";
import CalenderDatePicker from "@/components/ui/calender-date-picker";
import { RadioGroup } from "@/components/ui/radio-group";
import InputText from "@/components/ui/input-text";
import { UserProfileProps } from "@/interfaces/auth";
import { genderList } from "@/app/auth/register/components/register-form";
import toast from "react-hot-toast";
import { userFormSchema } from "@/utils/zod/zod-schemas";
import { updateProfile } from "@/lib/api/profile";

export default function UserDetailForm() {
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

  async function handleUpdateProfile() {
    const validationResult = userFormSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi Form Pengisian");
      return;
    }

    setErrors([]);
    const registerResponse = await updateProfile(formData);
    if (registerResponse.error) {
      toast.error(registerResponse.message);
      return;
    }

    toast.success(registerResponse.message);
  }

  return (
    <div className="flex flex-col gap-4">
      <ProfilePhotoSection />

      <div className="flex flex-col gap-6 bg-white p-4">
        <h2 className="text-xl font-bold">User Details</h2>

        <form
          className="flex flex-col gap-6"
          onSubmit={(e) => {
            e.preventDefault();
            handleUpdateProfile();
          }}
        >
          <div className="grid grid-cols-2 gap-x-14 gap-y-6">
            <InputText
              label="Email"
              name="email"
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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
              className="w-full"
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

          <div className="flex w-full justify-end">
            <Button
              className="w-fit"
              intent={"primary"}
              size={"default"}
              type="submit"
            >
              Save Changes
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
