import React from "react";
import AddProductForm from "../../inventory/components/add-product-form";
import PageHeader from "@/components/ui/page-header";

export default function EditProduct() {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Edit Product" showBackIcon={true} />
      <AddProductForm />
    </div>
  );
}
