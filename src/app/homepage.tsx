"use client";

import { Button } from "@/components/ui/button";
import { LoginAPIResponse } from "@/interfaces/auth";
import { ProfileProps } from "@/interfaces/profile";
import { logout } from "@/lib/auth/auth-cookie-handler";
import Link from "next/link";
import React from "react";
import StockInformation from "./(dashboard)/inventory/components/stock-information";
import {
  CategorySummary,
  GetAllProductProps,
  ProductStocksSummary,
} from "@/interfaces/product";
import PageHeader from "@/components/ui/page-header";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Homepage({
  categorySummary,
  profile,
  stockSummary,
}: {
  profile: ProfileProps | null;
  stockSummary: ProductStocksSummary;
  categorySummary: CategorySummary[];
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" />
      {/* <p>
        Welcome <span className="font-bold">{profile?.username}</span>
      </p> */}

      <StockInformation stockSummary={stockSummary} />
      <div className="grid grid-cols-2 gap-6">
        {/* Category summary */}
        <div className="flex flex-col gap-6 bg-white px-4 py-6">
          <h2 className="text-gray-90 text-xl font-bold">Category Summary</h2>
          <PieChart
            series={[
              {
                data: categorySummary,
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
        {/* product summary *dummy */}
        <div className="flex flex-col gap-6 bg-white px-4 py-6">
          <h2 className="text-gray-90 text-xl font-bold">Category Summary</h2>
          <PieChart
            series={[
              {
                data: categorySummary,
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
    </div>
  );
}
