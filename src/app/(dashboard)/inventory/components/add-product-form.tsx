"use client";

import { Button } from "@/components/ui/button";
import ImagePicker from "@/components/ui/image-uploader";
import InputText from "@/components/ui/input-text";
import { AddProductProps } from "@/interfaces/product";
import { addProduct } from "@/lib/api/product";
import { convertFilesToBase64 } from "@/utils/file-to-base64-converter";
import { addProductSchema } from "@/utils/zod/zod-schemas";
import {
  FormDataErrorProps,
  getZodErrorMessage,
  parseZodIssue,
} from "@/utils/zod/zod-utils";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<AddProductProps>(
    {} as AddProductProps,
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  async function getArrayofBytes(data: File[]) {
    const base64Image = await convertFilesToBase64(data);
    console.log(base64Image);
    setFormData((prev) => ({
      ...prev,
      images: base64Image,
    }));
  }

  async function handleSubmitAddProduct() {
    // console.log(formData, "formdata");
    const validationResult = addProductSchema.safeParse(formData);
    // console.log(validationResult, "validate result");

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi form pengisian produk");
      return;
    }
    setErrors([]);

    const addProductResponse = await addProduct(formData);
    if (addProductResponse.error) {
      toast.error(addProductResponse.message);
      // closeDialog();
      return;
    }
    toast.success(addProductResponse.message);
    router.push("/inventory");
    // closeDialog();
  }

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  }

  return (
    <form
      className="border-gray-20 flex flex-col items-center gap-8 border-b bg-white p-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitAddProduct();
      }}
    >
      <div className="flex w-full flex-col items-center gap-6">
        {/* Images Field */}
        <div className="flex w-full items-center justify-between">
          <p>Product Images</p>
          <div className="flex w-4/5 flex-col gap-2">
            <ImagePicker
              onChange={(data) => {
                getArrayofBytes(data);
              }}
            />
            <p className="text-red-600">
              {getZodErrorMessage({
                errors: errors,
                path: "images",
              })}
            </p>
          </div>
        </div>

        {/* Name Field */}
        <div className="flex w-full items-center justify-between">
          <p>Product Name</p>
          <div className="w-4/5">
            <InputText
              name="name"
              className="w-full"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "name",
              })}
            />
          </div>
        </div>

        {/* Quantity Field */}
        <div className="flex w-full items-center justify-between">
          <p>Quantity</p>
          <div className="w-4/5">
            <InputText
              className="w-full"
              name="quantity"
              type="number"
              placeholder="Enter current product quantity"
              value={formData.quantity}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "quantity",
              })}
            />
          </div>
        </div>
      </div>

      <Button
        className="w-full"
        intent={"primary"}
        size={"default"}
        type="submit"
      >
        Add Product
      </Button>
    </form>
  );
}
