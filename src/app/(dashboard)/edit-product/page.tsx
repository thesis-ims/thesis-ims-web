import React from "react";
import { redirect } from "next/navigation";

export default function EditProduct() {
  redirect("/add-product");

  return <div>EditProduct</div>;
}
