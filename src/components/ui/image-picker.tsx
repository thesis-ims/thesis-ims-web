"use client";

import { useState, useRef, useEffect } from "react";
import { Upload } from "lucide-react";
import toast from "react-hot-toast";
import Image from "next/image";
import { CloseIcon, RoundedPlusIcon } from "./icons";
import { convertFileToBase64 } from "@/utils/file-to-base64-converter";
import { base64StringDecoder } from "@/utils/base64-string-encoder";

// Define TypeScript types
export type ImageFile = {
  id: string;
  file?: File;
  preview: string;
  base64: string;
};

type ImagePickerProps = {
  maxFiles?: number;
  onChange?: (base64s: string[]) => void;
  initImages?: string[];
};

export default function ImagePicker({
  initImages,
  maxFiles = 10,
  onChange,
}: ImagePickerProps) {
  const [images, setImages] = useState<ImageFile[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;

    if (!files || files.length === 0) return;

    // Convert FileList to array and filter for jpeg/jpg
    const newFiles = Array.from(files).filter(
      (file) =>
        file.type === "image/jpeg" ||
        file.type === "image/jpg" ||
        file.type === "image/png",
    );

    // Check if adding new files would exceed maxFiles
    if (images.length + newFiles.length > maxFiles) {
      toast.error(`You can only upload a maximum of ${maxFiles} images.`);
      return;
    }

    // Create new image objects with previews
    const newImages = await Promise.all(
      newFiles.map(async (file) => ({
        id: crypto.randomUUID(),
        file,
        preview: URL.createObjectURL(file),
        base64: await convertFileToBase64(file),
      })),
    );

    // Update state
    const updatedImages = [...images, ...newImages];
    setImages(updatedImages);

    // Call onChange if provided
    if (onChange) {
      onChange(updatedImages.map((img) => img.base64));
    }

    // Reset file input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  const handleDeleteImage = (id: string) => {
    // Find the image to delete
    const imageToDelete = images.find((img) => img.id === id);

    // Revoke the object URL to prevent memory leaks
    if (imageToDelete) {
      URL.revokeObjectURL(imageToDelete.preview);
    }

    // Remove the image from state
    const updatedImages = images.filter((img) => img.id !== id);
    setImages(updatedImages);

    // Call onChange if provided
    if (onChange) {
      onChange(updatedImages.map((img) => img.base64));
    }
  };

  // Trigger file input click
  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  useEffect(() => {
    if (initImages && initImages.length > 0) {
      const newImages: ImageFile[] = initImages.map((image) => {
        return {
          base64: image,
          id: crypto.randomUUID(),
          preview: base64StringDecoder(image),
        };
      });
      setImages(newImages);
    }
  }, [initImages]);

  return (
    <div className="w-full">
      {/* input component */}
      <input
        ref={fileInputRef}
        type="file"
        multiple
        accept="image/jpeg,image/jpg,image/png"
        className="hidden"
        onChange={handleFileChange}
        disabled={images.length >= maxFiles}
      />

      {/* Upload button when empty image */}
      {images.length < 1 && (
        <div
          onClick={handleButtonClick}
          className={`flex cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 p-4 transition-colors hover:border-blue-500`}
        >
          <Upload className="mb-2 h-6 w-6 text-gray-400" />
          <p className="text-sm font-medium text-gray-700">
            Click to upload images
          </p>
          <p className="mt-1 text-xs text-gray-500">
            JPEG/JPG/PNG only ({images.length}/{maxFiles})
          </p>
        </div>
      )}

      {/* Image preview with + button */}
      {images.length > 0 && (
        <div className="flex flex-wrap items-center gap-3">
          {images.map((image) => (
            <div key={image.id} className="relative shrink-0">
              <Image
                height={0}
                width={0}
                src={image.preview}
                alt="Preview"
                className="aspect-square h-20 w-20 rounded-sm object-cover"
              />
              <button
                type="button"
                onClick={() => handleDeleteImage(image.id)}
                className="absolute top-1 right-1 cursor-pointer rounded-full bg-red-500 p-[1px]"
                aria-label="Delete image"
              >
                <CloseIcon className="h-4 w-4 text-white" />
              </button>
            </div>
          ))}

          {images.length < maxFiles && (
            <div onClick={handleButtonClick} className="flex flex-col gap-1">
              <RoundedPlusIcon className="h-7 w-7" />
              <p className="text-xs">
                ({images.length}/{maxFiles})
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
