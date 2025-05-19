"use client";

import { Button } from "@/components/ui/button";
import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { HorizontalOptionsIcon } from "@/components/ui/icons";
import { TableCell, TableRow } from "@/components/ui/table";
import { ProductProps } from "@/interfaces/product";
import { deleteProduct } from "@/lib/api/product";
import { base64StringDecoder } from "@/utils/base64-string-encoder";
import dayjs from "dayjs";
import _ from "lodash";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductTableRow({
  product,
}: {
  product: ProductProps;
}) {
  const [isOpen, setIsOpen] = useState(false);

  async function deleteProductHandler() {
    const deleteResponse = await deleteProduct(product.id);
    console.log(deleteResponse);

    if (deleteResponse.error) {
      toast.error(deleteResponse.message);
      setIsOpen(false);
      return;
    }
    toast.success(deleteResponse.message);
    setIsOpen(false);
  }

  // useEffect(() => {
  //   console.log(product.images);
  // }, []);

  return (
    <>
      <TableRow key={product.id}>
        <TableCell>
          <div className="flex items-center gap-2">
            <Image
              src={base64StringDecoder(_.first(product?.images!) as string)}
              alt="product image"
              width={0}
              height={0}
              className="h-10 w-10 rounded-sm object-cover"
            />
            <p>{product.name}</p>
          </div>
        </TableCell>
        <TableCell>{product.quantity}</TableCell>
        <TableCell>{dayjs(product.createdDate).format("D MMM YYYY")}</TableCell>
        <TableCell className="h-5 w-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HorizontalOptionsIcon className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent className="">
              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Delete
              </DropdownMenuItem>

              <DropdownMenuItem
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        title="Delete Product"
        description={`Are you sure you want to delete ${product.name}?`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmAction={() => {
          deleteProductHandler();
        }}
      />
    </>
  );
}
