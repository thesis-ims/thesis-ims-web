import React from "react";
import AddProductForm from "../inventory/components/add-product-form";
import PageHeader from "@/components/ui/page-header";

export default function AddProduct() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Add Product" showBackIcon={true} />
      <AddProductForm />
    </div>
  );
}
