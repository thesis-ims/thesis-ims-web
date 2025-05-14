import Button from "@/components/ui/button";
import { ProductProps } from "@/interfaces/product";
import dayjs from "dayjs";
import React from "react";

export default function ProductListTable({
  products,
}: {
  products: ProductProps[];
}) {
  return (
    <div className="flex flex-col">
      <div>
        <Button>Add Product</Button>
      </div>

      {/* table header */}
      <div className="grid grid-cols-8">
        <p className="col-span-2 border border-red-500">Product Name</p>
        <p className="col-span-1 border border-red-500">Quantity</p>
        <p className="col-span-1 border border-red-500">Last Updated</p>
      </div>

      {/* table contents */}
      {products.map((product) => {
        return <ProductRow product={product} />;
      })}
    </div>
  );
}

function ProductRow({ product }: { product: ProductProps }) {
  return (
    <div className="grid grid-cols-8">
      <p className="col-span-2 border border-red-500 px-3 py-4">
        {product.name}
      </p>
      <p className="col-span-1 border border-red-500 px-3 py-4">
        {product.quantity}
      </p>
      <p className="col-span-1 border border-red-500 px-3 py-4">
        {dayjs(product.createdDate).format("D MMM YYYY")}
      </p>
    </div>
  );
}
