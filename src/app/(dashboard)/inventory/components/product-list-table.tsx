import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ProductProps } from "@/interfaces/product";
import React, { useState } from "react";
import AddProductForm from "./add-product-form";
import ProductTableRow from "./product-table-row";
import Link from "next/link";
import ProductTableHeader from "./product-table-header";

export default function ProductListTable({
  products,
}: {
  products: ProductProps[];
}) {
  return (
    <>
      <div className="flex flex-col">
        <ProductTableHeader />

        {/* Table */}
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead>Availability</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length > 0 ? (
              products?.map((product) => {
                return <ProductTableRow product={product} key={product.id} />;
              })
            ) : (
              <ProductTableRow
                product={{
                  createdBy: "",
                  createdDate: "",
                  lut: "",
                  id: "",
                  images: [],
                  name: "dummy no data item",
                  quantity: 10,
                }}
              />
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
}
