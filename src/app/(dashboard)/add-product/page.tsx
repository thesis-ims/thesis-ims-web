import React from "react";
import AddProductForm from "../inventory/components/add-product-form";
import PageHeader from "@/components/ui/page-header";
import { getCategorySummary } from "@/lib/api/product";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default async function AddProduct() {
  const categorySummary = await getCategorySummary();
  const categoryList = categorySummary.data.map((category) => category.label);
  return (
    <div className="flex flex-col gap-6">
      <PageHeader
        title="Add Product"
        showBackIcon={true}
        ctaButton={
          <Link href="/add-product/bulk">
            <Button>Add Multiple Product</Button>
          </Link>
        }
      />
      <AddProductForm categoryList={categoryList} />
    </div>
  );
}
