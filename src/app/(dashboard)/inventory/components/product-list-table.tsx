"use client";

import {
  Table,
  TableBody,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { GetAllProductProps, ProductProps } from "@/interfaces/product";
import React, { useEffect, useState } from "react";
import ProductTableRow from "./product-table-row";
import ProductTableHeader from "./product-table-header";
import Pagination from "@/components/ui/pagination";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { StokkuIcon } from "@/components/ui/icons";
import { Button } from "@/components/ui/button";

export default function ProductListTable({
  products,
}: {
  products: GetAllProductProps;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [currentPage, setCurrentPage] = useState(1);

  const handleFilterChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", value);
    router.push(`${pathname}?${params.toString()}`);
  };

  useEffect(() => {
    // if()
    setCurrentPage(products.page);
  }, [products]);

  return (
    <div className="flex flex-col gap-6">
      {/* {JSON.stringify(products.page)} */}
      <div className="flex min-h-[65vh] flex-col">
        <ProductTableHeader />

        {products.object?.length > 0 ? (
          <Table>
            <TableHeader className="bg-primary-color-1 text-white">
              <TableRow>
                <TableHead>Product Name</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Buy Price</TableHead>
                <TableHead>Sell Price</TableHead>
                <TableHead>Description</TableHead>
                <TableHead>Stock</TableHead>
                <TableHead>Last Updated</TableHead>
                <TableHead>Availability</TableHead>
                <TableHead></TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {products?.object.map((product) => {
                return <ProductTableRow product={product} key={product.id} />;
              })}
            </TableBody>
          </Table>
        ) : (
          <div className="flex w-full flex-col items-center justify-center bg-white py-[6rem]">
            <div className="flex flex-col items-center gap-6">
              <h2 className="text-primary-color-1 text-2xl font-semibold">
                Your inventory is currently empty.
              </h2>
              <StokkuIcon className="text-gray-30 my-4 h-40 w-40" />
              <p className="text-primary-color-1 text-lg font-medium">
                Let’s add your first item
              </p>
              <Button intent={"primary"} size={"default"} className="w-full">
                Add Product
              </Button>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      <div className="flex w-full justify-center">
        <Pagination
          totalPages={products.totalPages}
          currentPage={currentPage}
          onPageChange={(page) => {
            console.log(page);
            setCurrentPage(page);
            handleFilterChange(`${page}`);
          }}
        />
      </div>
    </div>
  );
}
