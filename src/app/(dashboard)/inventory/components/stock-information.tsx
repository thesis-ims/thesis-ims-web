import { ProductStocksSummary } from "@/interfaces/product";
import React from "react";

export default function StockInformation({
  stockSummary,
}: {
  stockSummary: ProductStocksSummary;
}) {
  return (
    <div className="grid w-full grid-cols-3 gap-6">
      <StockCard text={"Available Stock"} value={stockSummary?.available} />
      <StockCard text={"Low Stock"} value={stockSummary?.lowStock} />
      <StockCard text={"Out of Stock"} value={stockSummary?.emptyStock} />
    </div>
  );
}

function StockCard({ text, value }: { text: string; value: number }) {
  return (
    <div className="flex flex-col bg-white p-4">
      <p className="text-gray-60">{text}</p>
      <p className="text-gray-90 text-2xl font-bold">{value || "-"}</p>
    </div>
  );
}
