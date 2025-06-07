"use client";

import { Button } from "@/components/ui/button";
import { LoginAPIResponse } from "@/interfaces/auth";
import { ProfileProps } from "@/interfaces/profile";
import { logout } from "@/lib/auth/auth-cookie-handler";
import Link from "next/link";
import React from "react";
import StockInformation from "./(dashboard)/inventory/components/stock-information";
import { GetAllProductProps, ProductStocksSummary } from "@/interfaces/product";
import PageHeader from "@/components/ui/page-header";
import { PieChart } from "@mui/x-charts/PieChart";

export default function Homepage({
  profile,
  stockSummary,
}: {
  profile: ProfileProps | null;
  stockSummary: ProductStocksSummary;
}) {
  return (
    <div className="flex flex-col gap-6">
      <PageHeader title="Dashboard" />
      <p>
        Welcome <span className="font-bold">{profile?.username}</span>
      </p>

      <StockInformation stockSummary={stockSummary} />
      {/* <PieChart
        // className="bg-red-500"
        series={[
          {
            data: [
              { id: 0, value: products.otherInfo.available, label: "series A" },
              {
                id: 1,
                value: products.otherInfo.emptyStock,
                label: "series B",
              },
              { id: 2, value: products.otherInfo.lowStock, label: "series C" },
            ],
          },
        ]}
        width={200}
        height={200}
      /> */}
    </div>
  );
}
