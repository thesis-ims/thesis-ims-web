"use client";

import ConfirmationDialog from "@/components/ui/confirmation-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import {
  HorizontalOptionsIcon,
  PencilIcon,
  TrashIcon,
} from "@/components/ui/icons";
import { TableCell, TableRow } from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { ProductProps } from "@/interfaces/product";
import { deleteProduct } from "@/lib/api/product";
import { base64StringDecoder } from "@/utils/base64-string-encoder";
import { renderCurrency } from "@/utils/renderCurrency";
import dayjs from "dayjs";
import _ from "lodash";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function ProductTableRow({
  product,
}: {
  product: ProductProps;
}) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  function renderProductAvailability() {
    if (product.quantity === 0) {
      return (
        <p className="w-fit rounded-full bg-red-600 px-3 py-[2px] text-xs font-medium">
          Out of Stock
        </p>
      );
    } else if (product.quantity < 10) {
      return (
        <p className="w-fit rounded-full bg-yellow-500 px-3 py-[2px] text-xs font-medium">
          Low Stock
        </p>
      );
    } else {
      return (
        <p className="w-fit rounded-full bg-green-600 px-3 py-[2px] text-xs font-medium">
          In Stock
        </p>
      );
    }
  }

  async function deleteProductHandler() {
    const deleteResponse = await deleteProduct(product.id!);
    console.log(deleteResponse);

    if (deleteResponse.error) {
      toast.error(deleteResponse.message);
      setIsOpen(false);
      return;
    }
    toast.success(deleteResponse.message);
    setIsOpen(false);
  }

  return (
    <>
      <TableRow className="bg-white">
        <TableCell className="max-w-28 min-w-40">
          <div className="flex items-center gap-2">
            {product.images?.length > 0 ? (
              <Image
                src={base64StringDecoder(_.first(product?.images!) as string)}
                alt="product image"
                width={0}
                height={0}
                className="h-10 w-10 rounded-sm object-cover"
              />
            ) : (
              <div className="bg-gray-20 h-10 w-10 rounded-sm" />
            )}
            <Tooltip>
              <TooltipTrigger className="overflow-hidden">
                <p className="truncate">{product.name}</p>
              </TooltipTrigger>
              <TooltipContent>
                <p>{product.name}</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </TableCell>

        <TableCell>{product.category || "-"}</TableCell>
        <TableCell>{renderCurrency({ price: product.buyPrice })}</TableCell>
        <TableCell>{renderCurrency({ price: product.sellPrice })}</TableCell>

        {/* description */}
        <TableCell className="max-w-28 min-w-40">
          {product.description ? (
            <div className="flex">
              <Tooltip>
                <TooltipTrigger className="overflow-hidden text-ellipsis whitespace-nowrap">
                  <p className="truncate">{product.description}</p>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{product.description}</p>
                </TooltipContent>
              </Tooltip>
            </div>
          ) : (
            <p>-</p>
          )}
        </TableCell>

        <TableCell>{product.quantity}</TableCell>
        <TableCell>{dayjs(product.createdDate).format("D MMM YYYY")}</TableCell>
        <TableCell>{renderProductAvailability()}</TableCell>
        <TableCell className="h-5 w-5">
          <DropdownMenu>
            <DropdownMenuTrigger>
              <HorizontalOptionsIcon className="h-5 w-5 cursor-pointer" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                className="text-gray-60"
                onClick={() => {
                  router.push(`/edit-product/${product.id}`);
                }}
              >
                <PencilIcon />
                <p>Edit</p>
              </DropdownMenuItem>

              <DropdownMenuItem
                className="text-gray-60"
                onClick={() => {
                  setIsOpen(true);
                }}
              >
                <TrashIcon />
                <p>Delete</p>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </TableCell>
      </TableRow>

      <ConfirmationDialog
        title="Delete Product"
        description={`Are you sure you want to delete product "${product.name}"?`}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        confirmAction={() => {
          deleteProductHandler();
        }}
      />
    </>
  );
}
