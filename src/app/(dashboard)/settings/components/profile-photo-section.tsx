"use client";

import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import { ProfilePlaceholderIcon, StokkuIcon } from "@/components/ui/icons";
import { ImageFile } from "@/components/ui/image-picker";
import { logout } from "@/lib/auth/auth-cookie-handler";
import { base64StringDecoder } from "@/utils/base64-string-encoder";
import { fileToBase64 } from "@/utils/file-to-base64-converter";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";

export default function ProfilePhotoSection({
  value,
  onChange,
  userId,
}: {
  value: string;
  onChange: (data: string) => void;
  userId: string;
}) {
  const [isLoginDialogOpen, setIsLoginDialogOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<ImageFile>();

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target?.files![0];

    if (!file) return;
    if (file.type !== "image/jpeg" && file.type !== "image/jpg") return;

    const newImage: ImageFile = {
      id: crypto.randomUUID(),
      file,
      preview: URL.createObjectURL(file),
      base64: await fileToBase64(file),
    };
    setImage(newImage);

    // Call onChange if provided
    if (onChange) {
      onChange(newImage.base64);
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (value) {
      const newImage: ImageFile = {
        base64: value,
        id: crypto.randomUUID(),
        preview: base64StringDecoder(value),
      };
      setImage(newImage);
    }
  }, [value]);

  return (
    <>
      <div className="flex flex-col gap-6 bg-white p-4">
        <h2 className="text-xl font-bold">Profile Photo</h2>
        <div className="flex items-center justify-between">
          {/* Left Section */}
          <div className="flex items-center gap-12">
            {/* profile pict uploader */}
            <div className="flex items-center gap-6">
              {value ? (
                <Image
                  src={image?.preview!}
                  alt="profile pict"
                  className="h-24 w-24 rounded-full object-cover"
                  width={0}
                  height={0}
                />
              ) : (
                <div className="bg-gray-10 flex h-24 w-24 items-center justify-center rounded-full">
                  <ProfilePlaceholderIcon className="text-gray-50" />
                </div>
              )}

              <div className="flex flex-col items-center gap-2">
                <input
                  ref={fileInputRef}
                  type="file"
                  accept="image/jpeg,image/jpg"
                  className="hidden"
                  onChange={handleFileChange}
                />

                <Button
                  intent={"secondary"}
                  onClick={() => {
                    handleButtonClick();
                  }}
                >
                  <p className="px-4">Upload Photo</p>
                </Button>

                {value && (
                  <p
                    className="cursor-pointer"
                    onClick={() => {
                      onChange("");
                      setImage({} as ImageFile);
                    }}
                  >
                    Remove
                  </p>
                )}
              </div>
            </div>

            {/* instruction section
            <div>tutor</div> */}
          </div>

          {/* Right Section */}
          <Button
            intent={"secondary"}
            className="h-fit"
            onClick={() => {
              setIsLoginDialogOpen(true);
            }}
          >
            Log Out
          </Button>
        </div>
      </div>

      <ConfirmationDialog
        icon={<StokkuIcon className="text-primary-color-60 h-12 w-12" />}
        title="Logging Out?"
        description="You will need to log in again to access your account."
        isOpen={isLoginDialogOpen}
        setIsOpen={setIsLoginDialogOpen}
        confirmAction={() => {
          logout();
        }}
      />
    </>
  );
}
