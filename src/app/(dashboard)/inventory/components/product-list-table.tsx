"use client";

import Button from "@/components/ui/button";
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
import dayjs from "dayjs";
import React, { useState } from "react";
import AddProductForm from "./add-product-form";

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
          <Button
            size={"small"}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            Add Product
          </Button>
        </div>

        {/* Table */}
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead>Product Name</TableHead>
              <TableHead>Quantity</TableHead>
              <TableHead>Last Updated</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => {
              return (
                <TableRow key={product.id}>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.quantity}</TableCell>
                  <TableCell>
                    {dayjs(product.createdDate).format("D MMM YYYY")}
                  </TableCell>
                </TableRow>
              );
            })}
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
