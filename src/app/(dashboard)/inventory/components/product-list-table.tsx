"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
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

export default function ProductListTable({
  products,
}: {
  products: ProductProps[];
}) {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <div className="flex flex-col">
        {/* Table Header Utils */}
        <div className="bg-primary-color-1 flex items-center justify-between px-3 py-4">
          <h2 className="text-[20px] font-medium text-white">Products</h2>
          <Link href="/add-product">
            <Button
              size={"small"}
              // onClick={() => {
              //   setIsOpen(true);
              // }}
            >
              Add Product
            </Button>
          </Link>
          {/* <Button
            size={"small"}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Product
          </Button> */}
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Last Updated</TableHead>
              <TableHead></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products?.length > 0 ? (
              products?.map((product) => {
                return <ProductTableRow product={product} />;
              })
            ) : (
              <ProductTableRow
                product={{
                  createdBy: "",
                  createdDate: "",
                  lut: "",
                  id: "",
                  images: [],
                  name: "test product",
                  quantity: 10,
                }}
              />
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="flex flex-col gap-6">
          <DialogHeader className="text-[20px] font-bold">
            Add New Product
          </DialogHeader>
          <AddProductForm
            closeDialog={() => {
              setIsOpen(false);
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
