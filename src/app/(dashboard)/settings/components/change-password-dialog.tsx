import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import InputText from "@/components/ui/input-text";
import { ChangePasswordProps } from "@/interfaces/profile";
import { changePassword } from "@/lib/api/profile";
import { changePasswordSchema } from "@/utils/zod/zod-schemas";
import {
  FormDataErrorProps,
  getZodErrorMessage,
  parseZodIssue,
} from "@/utils/zod/zod-utils";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ChangePasswordDialog({
  isChangePasswordOpen,
  setIsChangePasswordOpen,
  userId,
}: {
  isChangePasswordOpen: boolean;
  setIsChangePasswordOpen: (data: boolean) => void;
  userId: string;
}) {
  const [formData, setFormData] = useState<ChangePasswordProps>(
    {} as ChangePasswordProps,
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function changePasswordHandler() {
    const validationResult = changePasswordSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi Form Pengisian");
      return;
    }
    if (formData.newPassword !== formData.newPasswordConfirmation) {
      toast.error("Konfirmasi password baru anda tidak cocok");
      return;
    }
    setErrors([]);

    const registerResponse = await changePassword({
      id: userId,
      body: formData,
    });
    if (registerResponse.error) {
      toast.error(registerResponse.message);
      return;
    }
    toast.success(registerResponse.message);
  }

  useEffect(() => {
    setFormData({} as ChangePasswordProps);
    setErrors([]);
  }, [isChangePasswordOpen]);

  return (
    <Dialog open={isChangePasswordOpen} onOpenChange={setIsChangePasswordOpen}>
      <DialogContent className="flex flex-col gap-10">
        <DialogHeader showClose={true}>Change Password</DialogHeader>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            changePasswordHandler();
          }}
          className="flex flex-col gap-10"
        >
          <div className="flex flex-col gap-6">
            <InputText
              isPassword
              label="Current Password"
              name="oldPassword"
              className="w-full"
              placeholder="Enter your current password"
              value={formData.oldPassword}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "oldPassword",
              })}
            />
            <InputText
              isPassword
              label="New Password"
              name="newPassword"
              className="w-full"
              placeholder="Create a new password"
              value={formData.newPassword}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "newPassword",
              })}
            />
            <InputText
              isPassword
              label="Confirm Password"
              name="newPasswordConfirmation"
              className="w-full"
              placeholder="Re-enter your new password"
              value={formData.newPasswordConfirmation}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "newPasswordConfirmation",
              })}
            />
          </div>

          <div className="flex justify-end gap-6">
            <Button size={"small"} onClick={() => {}} type="submit">
              Change Password
            </Button>

            <Button
              size={"small"}
              intent={"secondary"}
              onClick={(e) => {
                e.preventDefault();
                setIsChangePasswordOpen(false);
              }}
            >
              Discard
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
