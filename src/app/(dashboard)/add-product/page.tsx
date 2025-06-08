import React from "react";
import AddProductForm from "../inventory/components/add-product-form";
import PageHeader from "@/components/ui/page-header";
import { getCategorySummary } from "@/lib/api/product";

export default async function AddProduct() {
  const categorySummary = await getCategorySummary();
  const categoryList = categorySummary.data.map((category) => category.label);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Add Product" showBackIcon={true} />
      <AddProductForm categoryList={categoryList} />
    </div>
  );
}
