"use client";

import { Button } from "@/components/ui/button";
import { FilterIcon, PlusIcon } from "@/components/ui/icons";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import React from "react";
import ExportCsv from "./export-csv";

export const ProductFilters = [
  {
    value: "LOWEST_STOCK",
    label: "Lowest Stock",
  },
  {
    value: "HIGHEST_STOCK",
    label: "Highest Stock",
  },
  {
    value: "NAME_ASCENDING",
    label: "Name Ascending",
  },
  {
    value: "NAME_DESCENDING",
    label: "Name Descending",
  },
  {
    value: "OLDEST",
    label: "Oldest",
  },
  {
    value: "NEWEST",
    label: "Newest",
  },
];

export default function ProductTableHeader() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const sb = searchParams.get("sb");

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("sb", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="bg-primary-color-1 flex items-center justify-between px-3 py-4">
      <h2 className="text-[20px] font-medium text-white">Products</h2>
      <div className="flex items-center gap-2">
        <Select value={sb ?? undefined} onValueChange={handleFilterChange}>
          <SelectTrigger>
            <FilterIcon className="text-primary-color-60 h-5 w-5" />
            <SelectValue placeholder="Filters" />
          </SelectTrigger>
          <SelectContent>
            {ProductFilters.map((filter) => {
              return (
                <SelectItem
                  value={filter.value}
                  className={`${sb === filter.value ? "bg-gray-20 font-semibold text-black" : ""}`}
                >
                  {filter.label}
                </SelectItem>
              );
            })}
          </SelectContent>
        </Select>

        <ExportCsv />
        <Link href="/add-product">
          <Button size={"small"}>
            <PlusIcon className="h-6 w-6" />
            <p>Add Product</p>
          </Button>
        </Link>
      </div>
    </div>
  );
}
