import React from "react";
import AddProductForm from "../../inventory/components/add-product-form";
import PageHeader from "@/components/ui/page-header";
import { getProductDetail } from "@/lib/api/product";

type EditProductParams = {
  productId: string; // Assuming the route is something like /products/edit/[productId]
};

export default async function EditProduct({
  params,
}: {
  params: EditProductParams;
}) {
  const initProductData = await getProductDetail(params.productId);
  return (
    <div className="flex flex-col gap-6">
      {/* {JSON.stringify(initProductData.data)} */}
      <PageHeader title="Edit Product" showBackIcon={true} />
      <AddProductForm initProductData={initProductData.data} />
    </div>
  );
}
