"use client";

import { Button } from "@/components/ui/button";
import ImagePicker from "@/components/ui/image-picker";
import InputText from "@/components/ui/input-text";
import { ProductProps } from "@/interfaces/product";
import { addProduct, updateProduct } from "@/lib/api/product";
import { addProductSchema } from "@/utils/zod/zod-schemas";
import {
  FormDataErrorProps,
  getZodErrorMessage,
  parseZodIssue,
} from "@/utils/zod/zod-utils";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function AddProductForm({
  initProductData,
}: {
  initProductData?: ProductProps;
}) {
  const pathName = usePathname();
  const router = useRouter();
  const [formData, setFormData] = useState<ProductProps>({} as ProductProps);
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  async function insertImageHandler(data: string[]) {
    setFormData((prev) => ({
      ...prev,
      images: data,
    }));
  }

  async function handleAddOrUpdateHandler() {
    console.log(formData, "form data");
    if (pathName.includes("add-product")) {
      return await addProduct(formData);
    } else {
      return await updateProduct(formData);
    }
  }

  async function handleSubmitProductForm() {
    const validationResult = addProductSchema.safeParse(formData);

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi form pengisian produk");
      return;
    }
    setErrors([]);

    const submitResponse = await handleAddOrUpdateHandler();
    if (submitResponse.error) {
      toast.error(submitResponse.message);
      return;
    }
    toast.success(submitResponse.message);
    router.push("/inventory");
  }

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value, type } = e.target;
    const parsedValue =
      type === "number" ? (value === "" ? "" : Number(value)) : value;

    setFormData((prev) => ({ ...prev, [name]: parsedValue }));
  }

  useEffect(() => {
    if (initProductData) {
      setFormData(initProductData);
    }
  }, [initProductData]);

  return (
    <form
      className="border-gray-20 flex flex-col items-center gap-8 border-b bg-white p-8"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitProductForm();
      }}
    >
      {/* {JSON.stringify(formData)} */}
      <div className="flex w-full flex-col items-center gap-6">
        {/* Images Field */}
        <div className="flex w-full items-center justify-between">
          <p>Product Images</p>
          <div className="flex w-4/5 flex-col gap-2">
            <ImagePicker
              initImages={formData.images}
              onChange={(data) => {
                insertImageHandler(data);
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

        {/* Description Field */}
        <div className="flex w-full items-center justify-between">
          <p>Product Description</p>
          <div className="w-4/5">
            <InputText
              name="description"
              className="w-full"
              placeholder="Enter product description"
              value={formData.description}
              onChange={handleOnChangeInput}
              errorMessages={getZodErrorMessage({
                errors: errors,
                path: "description",
              })}
            />
          </div>
        </div>

        {/* Quantity Field */}
        <div className="flex w-full items-center justify-between">
          <p>Stock</p>
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

      {/* submit button */}
      <div className="flex w-full items-center justify-end gap-6">
        <Button intent={"primary"} size={"default"} type="submit">
          {pathName.includes("add-product") ? "Add Product" : "Update Product"}
        </Button>
        <Button
          intent={"secondary"}
          size={"default"}
          onClick={(e) => {
            e.preventDefault();
            router.back();
          }}
        >
          Discard
        </Button>
      </div>
    </form>
  );
}
