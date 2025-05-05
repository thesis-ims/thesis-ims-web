"use client";

import Button from "@/components/ui/button";
import InputText from "@/components/ui/input-text";
import { AddProductProps } from "@/interfaces/product";
import { addProduct, getAllProducts } from "@/lib/api/product";
import React, { useState } from "react";

export default function ProductPage() {
  const [formData, setFormData] = useState<AddProductProps>(
    {} as AddProductProps,
  );

  function handleOnChangeInput(e: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }

  async function handleSubmitLoginForm() {
    // const validationResult = loginSchema.safeParse(formData);

    // if (!validationResult.success) {
    //   const issues: FormDataErrorProps[] = validationResult.error.issues.map(
    //     (issue) => {
    //       return {
    //         path: issue.path[0] as string,
    //         message: issue.message,
    //       };
    //     },
    //   );
    //   setErrors(issues);
    //   alert("lengkapi form data");
    //   return;
    // }

    // setErrors([]);
    const loginResponse = await addProduct(formData);

    alert(loginResponse.message);
  }

  return (
    <div className="flex flex-col gap-10">
      <div className="flex items-center gap-2"></div>
      <form
        className="border-gray-20 flex flex-col items-center gap-8 border-b py-6"
        onSubmit={(e) => {
          e.preventDefault();
          handleSubmitLoginForm();
        }}
      >
        <div className="flex flex-col items-center gap-4">
          <InputText
            className="w-[520px]"
            label="Name"
            name="name"
            placeholder="enter username"
            value={formData.name}
            onChange={handleOnChangeInput}
            // errorMessages={getZodErrorMessage({
            //   errors: errors,
            //   path: "username",
            // })}
          />

          <InputText
            className="w-[520px]"
            label="Quantity"
            name="quantity"
            placeholder="enter password"
            value={formData.quantity}
            onChange={handleOnChangeInput}
            // errorMessages={getZodErrorMessage({
            //   errors: errors,
            //   path: "password",
            // })}
          />
        </div>

        <Button
          className="w-full"
          intent={"primary"}
          size={"default"}
          type="submit"
        >
          Log In
        </Button>
      </form>
    </div>
  );
}
