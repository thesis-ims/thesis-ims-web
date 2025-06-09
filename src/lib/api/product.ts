"use server";

import {
  CategorySummary,
  GetAllProductProps,
  ImportCsvProps,
  ProductProps,
  ProductStocksSummary,
} from "@/interfaces/product";
import middlewareAxios from "@/utils/axios-interceptor";
import { revalidatePath } from "next/cache";

export async function getStockSummary() {
  try {
    let stockSummaryResponse = await middlewareAxios.post(
      `/api/products/get-stock-summary`,
      {},
    );

    console.log(stockSummaryResponse, "get stock summary response");

    return {
      data: stockSummaryResponse.data.data as ProductStocksSummary,
      message: stockSummaryResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get stock summary");
    return {
      data: {} as ProductStocksSummary,
      message: error?.response?.data?.message || "",
      error: true,
    };
  }
}
export async function getCategorySummary() {
  try {
    let categorySummaryResponse = await middlewareAxios.post(
      `/api/products/get-category-summary`,
      {},
    );

    console.log(categorySummaryResponse, "get category summary response");

    return {
      data: categorySummaryResponse.data.data as CategorySummary[],
      message: categorySummaryResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get category summary");
    return {
      data: {} as CategorySummary[],
      message: error?.response?.data?.message || "",
      error: true,
    };
  }
}
export async function getAllProducts({
  sort,
  page,
  size = 9,
}: {
  sort?: string;
  page?: number;
  size?: number;
}) {
  try {
    let allProductResponse = await middlewareAxios.post(
      `/api/products/get-all-product`,
      {
        page: page,
        size: size,
        filter: sort,
      },
    );

    console.log(allProductResponse, "get all product response");

    return {
      data: allProductResponse.data.data as GetAllProductProps,
      message: allProductResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get all product id");
    return {
      data: {} as GetAllProductProps,
      message: error?.response?.data?.message || "",
      error: true,
    };
  }
}
export async function getProductDetail(productId: string) {
  try {
    let productDetailResponse = await middlewareAxios.post(
      `/api/products/get-product-detail`,
      {
        productId: productId,
      },
    );

    console.log(productDetailResponse, "get all product response");

    return {
      data: productDetailResponse.data.data as ProductProps,
      message: productDetailResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get product details");
    return {
      data: {} as ProductProps,
      message: error?.response?.data?.message || "",
      error: true,
    };
  }
}
export async function addProduct(formData: ProductProps) {
  console.log(formData, "add product body");
  try {
    let addProductResponse = await middlewareAxios.post(
      `/api/products/insert`,
      {
        ...formData,
      },
    );

    console.log(addProductResponse, "add product response");
    revalidatePath("/inventory");
    return {
      data: {},
      message: addProductResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error add product");
    return {
      data: {},
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
export async function updateProduct(formData: ProductProps) {
  try {
    let updateProductResponse = await middlewareAxios.post(
      `/api/products/update`,
      {
        id: formData.id,
        name: formData.name,
        description: formData.description || "",
        quantity: formData.quantity,
        images: formData.images,
        category: formData.category,
        buyPrice: formData.buyPrice,
        sellPrice: formData.sellPrice,
      },
    );

    console.log(updateProductResponse, "update product response");
    revalidatePath("/inventory");
    return {
      data: {},
      message: updateProductResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error update product");
    return {
      data: {},
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
export async function deleteProduct(id: string) {
  try {
    let deleteProductResponse = await middlewareAxios.post(
      `/api/products/delete`,
      {
        productId: id,
      },
    );

    console.log(deleteProductResponse, "delete product response");
    revalidatePath("/inventory");
    return {
      message: deleteProductResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error add product");
    return {
      message: error?.response?.data?.message,
      error: true,
    };
  }
}

export async function importCsv(formData: ImportCsvProps) {
  try {
    let importCsvResponse = await middlewareAxios.post(
      "/api/products/import-csv",
      {
        importType: formData.importType,
        csvData: formData.csvData,
      },
    );
    console.log(importCsvResponse, "import csv response");
    return {
      message: importCsvResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error import csv");
    return {
      message: error?.response?.data?.message,
      error: true,
    };
  }
}

export async function exportCsv() {
  try {
    const response = await middlewareAxios.post(
      "/api/products/export-csv",
      {},
      {
        responseType: "text",
      },
    );
    return {
      data: response.data,
      error: false,
    };
  } catch (error: any) {
    return {
      error: true,
      message: error?.response?.data?.message || "Export failed",
    };
  }
}
