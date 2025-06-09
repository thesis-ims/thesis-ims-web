import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { GetAllProductProps, ProductProps } from "@/interfaces/product";
import { getAllProducts } from "@/lib/api/product";
import { base64StringDecoder } from "@/utils/base64-string-encoder";
import _ from "lodash";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";

export default function ProductsHomepageRecap({
  lowStockProducts,
  outOfStockProducts,
}: {
  lowStockProducts: GetAllProductProps;
  outOfStockProducts: GetAllProductProps;
}) {
  const size = 5;
  const [loading, setLoading] = useState(false);
  const [lowStocKRef, lowStockInView] = useInView();
  const [noStockRef, noStockInView] = useInView();

  const [lowStockPage, setLowStockPage] = useState(2);
  const [noStockPage, setNoStockPage] = useState(2);

  const [lowStockProductsState, setLowStockProductsState] =
    useState<ProductProps[]>();
  const [outOfStockProductsState, setOutOfStockProductsState] =
    useState<ProductProps[]>();

  async function fetchMoreProducts({
    page,
    type,
  }: {
    page: number;
    type: string;
  }) {
    if (loading) return;
    setLoading(true);
    const fetchMoreProductResponse = await getAllProducts({
      sort: type,
      page: page,
      size: size,
    });

    return fetchMoreProductResponse;
  }

  async function fetchMoreLowStockProducts() {
    const fetchMoreResponse = await fetchMoreProducts({
      page: lowStockPage,
      type: "LOW_STOCK",
    });
    if (!fetchMoreResponse?.error) {
      setLowStockProductsState((prev) => [
        ...prev!,
        ...fetchMoreResponse?.data.object!,
      ]);
      setLowStockPage(lowStockPage + 1);
    }
    setLoading(false);
  }

  async function fetchMoreOutofStockProducts() {
    const fetchMoreResponse = await fetchMoreProducts({
      page: noStockPage,
      type: "OUT_OF_STOCK",
    });
    if (!fetchMoreResponse?.error) {
      setOutOfStockProductsState((prev) => [
        ...prev!,
        ...fetchMoreResponse?.data.object!,
      ]);
      setNoStockPage(noStockPage + 1);
    }
    setLoading(false);
  }

  useEffect(() => {
    setLowStockProductsState(lowStockProducts.object);
    setOutOfStockProductsState(outOfStockProducts.object);
  }, []);

  useEffect(() => {
    if (lowStockInView && lowStockPage <= lowStockProducts.totalPages) {
      fetchMoreLowStockProducts();
    }
    if (noStockInView && noStockPage <= outOfStockProducts.totalPages) {
      fetchMoreOutofStockProducts();
    }
  }, [lowStockInView, noStockInView]);

  return (
    <div className="grid grid-cols-2">
      {/* low stock products */}
      <div className="flex h-[45vh] flex-col overflow-auto border-r border-white">
        <h2 className="bg-primary-color-1 p-5 text-lg font-bold text-white">
          Low Stock Products
        </h2>
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead className="w-full">Product Name</TableHead>
              <TableHead className="w-auto whitespace-nowrap">
                Product Stock
              </TableHead>
              <TableHead className="w-auto whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {lowStockProductsState?.map((lowProduct) => {
              return (
                <TableRow>
                  <TableCell className="w-full">
                    <div className="flex items-center gap-2">
                      {lowProduct.images?.length > 0 ? (
                        <Image
                          src={base64StringDecoder(
                            _.first(lowProduct?.images!) as string,
                          )}
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
                          <p className="truncate">{lowProduct.name}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{lowProduct.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>

                  <TableCell className="w-auto whitespace-nowrap">
                    {lowProduct.quantity}
                  </TableCell>

                  <TableCell className="w-auto whitespace-nowrap">
                    <Link href={`/edit-product/${lowProduct.id}`}>
                      <Button size={"small"} intent={"secondary"}>
                        Edit Product
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}

            {lowStockPage <= lowStockProducts.totalPages && (
              <TableRow ref={lowStocKRef}>
                <TableCell>Load more...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* out of stock products */}
      <div className="flex h-[45vh] flex-col overflow-auto">
        <h2 className="bg-primary-color-1 p-5 text-lg font-bold text-white">
          Out of Stock Products
        </h2>
        <Table>
          <TableHeader className="bg-primary-color-1 text-white">
            <TableRow>
              <TableHead className="w-full">Product Name</TableHead>
              <TableHead className="w-auto whitespace-nowrap">
                Product Stock
              </TableHead>
              <TableHead className="w-auto whitespace-nowrap"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {outOfStockProductsState?.map((outOfStockProduct) => {
              return (
                <TableRow>
                  <TableCell className="w-full">
                    <div className="flex items-center gap-2">
                      {outOfStockProduct.images?.length > 0 ? (
                        <Image
                          src={base64StringDecoder(
                            _.first(outOfStockProduct?.images!) as string,
                          )}
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
                          <p className="truncate">{outOfStockProduct.name}</p>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>{outOfStockProduct.name}</p>
                        </TooltipContent>
                      </Tooltip>
                    </div>
                  </TableCell>

                  <TableCell className="w-auto whitespace-nowrap">
                    {outOfStockProduct.quantity}
                  </TableCell>

                  <TableCell className="w-auto whitespace-nowrap">
                    <Link href={`/edit-product/${outOfStockProduct.id}`}>
                      <Button size={"small"} intent={"secondary"}>
                        Edit Product
                      </Button>
                    </Link>
                  </TableCell>
                </TableRow>
              );
            })}

            {noStockPage <= outOfStockProducts.totalPages && (
              <TableRow ref={noStockRef}>
                <TableCell>Load more...</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
