import { GetAllProductProps } from "@/interfaces/product";
import React from "react";

export default function ProductsHomepageRecap({
  lowStockProducts,
  outOfStockProducts,
}: {
  lowStockProducts: GetAllProductProps;
  outOfStockProducts: GetAllProductProps;
}) {
  return (
    <div className="grid grid-cols-2 gap-6">
      <div>
        {lowStockProducts.object.map((lowProduct) => {
          return <p>{lowProduct.name}</p>;
        })}
      </div>

      <div>
        {outOfStockProducts.object.map((outOfStockProduct) => {
          return <p>{outOfStockProduct.name}</p>;
        })}
      </div>
    </div>
  );
}
