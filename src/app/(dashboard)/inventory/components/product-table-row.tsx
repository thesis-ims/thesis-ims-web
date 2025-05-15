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
import dayjs from "dayjs";
import React from "react";
import toast from "react-hot-toast";

export default function ProductTableRow({
  product,
}: {
  product: ProductProps;
}) {
  async function deleteProductHandler() {
    const deleteResponse = await deleteProduct(product.id);

    if (deleteResponse.error) {
      toast.error(deleteResponse.message);
    }
    toast.success(deleteResponse.message);
  }

  return (
    <TableRow key={product.id}>
      <TableCell>{product.name}</TableCell>
      <TableCell>{product.quantity}</TableCell>
      <TableCell>{dayjs(product.createdDate).format("D MMM YYYY")}</TableCell>
      <TableCell className="h-5 w-5">
        <DropdownMenu>
          <DropdownMenuTrigger>
            <HorizontalOptionsIcon className="h-5 w-5 cursor-pointer" />
          </DropdownMenuTrigger>
          <DropdownMenuContent className="">
            <DropdownMenuGroup>
              <DropdownMenuItem
                onClick={() => {
                  deleteProductHandler();
                }}
              >
                Delete Product
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
}
