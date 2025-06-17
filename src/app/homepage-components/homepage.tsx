"use client";

import React from "react";
import StockInformation from "../(dashboard)/inventory/components/stock-information";
import {
  CategorySummary,
  GetAllProductProps,
  ProductStocksSummary,
} from "@/interfaces/product";
import PageHeader from "@/components/ui/page-header";
import { PieChart } from "@mui/x-charts/PieChart";
import ProductsHomepageRecap from "./products-homepage-recap";

export const colorPalette = [
  "#343A3F",
  "#121619",
  "#A6C8FF",
  "#0F62FE",
  "#001D6C",
];

export default function Homepage({
  categorySummary,
  stockSummary,
  lowStockProducts,
  outOfStockProducts,
  productNameSummary,
}: {
  stockSummary: ProductStocksSummary;
  categorySummary: CategorySummary[];
  productNameSummary: CategorySummary[];
  lowStockProducts: GetAllProductProps;
  outOfStockProducts: GetAllProductProps;
}) {
  // Function to limit data to top 4 + others
  const getLimitedData = (data: CategorySummary[], maxItems = 4) => {
    if (data.length <= maxItems + 1) {
      return data; // Return original if already within limit
    }

    // Sort by value in descending order
    const sortedData = [...data].sort((a, b) => b.value - a.value);

    // Take top items
    const topItems = sortedData.slice(0, maxItems);

    // Sum remaining items
    const remainingItems = sortedData.slice(maxItems);
    const othersValue = remainingItems.reduce(
      (sum, item) => sum + item.value,
      0,
    );

    // Add "Others" category if there are remaining items
    if (othersValue > 0) {
      topItems.push({
        label: "Others",
        value: othersValue,
      });
    }

    return topItems;
  };

  // Usage in your component
  let limitedCategorySummary = getLimitedData(categorySummary);

  limitedCategorySummary = limitedCategorySummary.map((item, index) => {
    return { ...item, color: colorPalette[index] };
  });
  let limitedProductNamesSummary = getLimitedData(productNameSummary);

  limitedProductNamesSummary = limitedProductNamesSummary.map((item, index) => {
    return { ...item, color: colorPalette[index] };
  });

  return (
    <div className="flex flex-col gap-6">
      {/* {JSON.stringify(limitedCategorySummary)} */}
      <PageHeader title="Dashboard" />

      <StockInformation stockSummary={stockSummary} />

      {/* charts */}
      <div className="grid grid-cols-2 gap-6">
        {/* Category summary */}
        <div className="flex flex-col gap-6 bg-white px-4 py-6">
          <h2 className="text-gray-90 text-xl font-bold">Category Summary</h2>
          <PieChart
            series={[
              {
                data: limitedCategorySummary,
              },
            ]}
            width={220}
            height={220}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "top", horizontal: "center" },
              },
            }}
          />
        </div>

        {/* Product summary */}
        <div className="flex flex-col gap-6 bg-white px-4 py-6">
          <h2 className="text-gray-90 text-xl font-bold">Product Summary</h2>
          <PieChart
            series={[
              {
                data: limitedProductNamesSummary,
              },
            ]}
            width={220}
            height={220}
            slotProps={{
              legend: {
                direction: "horizontal",
                position: { vertical: "top", horizontal: "center" },
              },
            }}
          />
        </div>
      </div>

      <ProductsHomepageRecap
        lowStockProducts={lowStockProducts}
        outOfStockProducts={outOfStockProducts}
      />
    </div>
  );
}
