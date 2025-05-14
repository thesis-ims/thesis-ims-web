import Button from "@/components/ui/button";
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
import React from "react";

export default function ProductListTable({
  products,
}: {
  products: ProductProps[];
}) {
  return (
    <div className="flex flex-col">
      <div className="bg-primary-color-1 flex items-center justify-between px-3 py-4">
        <h2 className="text-[20px] font-medium text-white">Products</h2>
        <Button size={"small"}>Add Product</Button>
      </div>

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
  );
}
