import { Button } from "@/components/ui/button";
import ImagePicker from "@/components/ui/image-uploader";
import InputText from "@/components/ui/input-text";
import { AddProductProps } from "@/interfaces/product";
import { addProduct } from "@/lib/api/product";
import { convertFilesToBase64 } from "@/utils/file-to-base64-converter";
import { addProductSchema } from "@/utils/zod/zod-schemas";
import { FormDataErrorProps, parseZodIssue } from "@/utils/zod/zod-utils";
import React, { useState } from "react";
import toast from "react-hot-toast";

export default function AddProductForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [formData, setFormData] = useState<AddProductProps>(
    {} as AddProductProps,
  );
  const [errors, setErrors] = useState<FormDataErrorProps[]>(
    [] as FormDataErrorProps[],
  );

  async function handleSubmitAddProduct() {
    console.log(formData);
    const validationResult = addProductSchema.safeParse(formData);
    console.log(validationResult);

    if (!validationResult.success) {
      setErrors(parseZodIssue(validationResult.error.issues));
      toast.error("Lengkapi form pengisian produk");
      return;
    }
    setErrors([]);

    const addProductResponse = await addProduct(formData);
    if (addProductResponse.error) {
      toast.error(addProductResponse.message);
      closeDialog();
      return;
    }
    toast.success(addProductResponse.message);
    closeDialog();
  }

  async function getArrayofBytes(data: File[]) {
    const base64Image = await convertFilesToBase64(data);
    console.log(base64Image);
    setFormData((prev) => ({
      ...prev,
      images: base64Image,
    }));
  }

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  return (
    <form
      className="border-gray-20 flex flex-col items-center gap-8 border-b"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmitAddProduct();
      }}
    >
      <div className="flex w-full flex-col items-center gap-6">
        <ImagePicker
          onChange={(data) => {
            getArrayofBytes(data);
          }}
        />

        {/* Name Field */}
        <div className="flex w-full items-center justify-between">
          <p>Product Name</p>
          <div className="w-3/4">
            <InputText
              name="name"
              className="w-full"
              placeholder="Enter product name"
              value={formData.name}
              onChange={handleOnChangeInput}
              // errorMessages={getZodErrorMessage({
              //   errors: errors,
              //   path: "username",
              // })}
            />
          </div>
        </div>

        {/* Quantity Field */}
        <div className="flex w-full items-center justify-between">
          <p>Quantity</p>
          <div className="w-3/4">
            <InputText
              className="w-full"
              name="quantity"
              placeholder="Enter current product quantity"
              value={formData.quantity}
              onChange={handleOnChangeInput}
              // errorMessages={getZodErrorMessage({
              //   errors: errors,
              //   path: "password",
              // })}
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
