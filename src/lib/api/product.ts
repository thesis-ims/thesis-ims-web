"use server";

import { AddProductProps, GetAllProductProps } from "@/interfaces/product";
import middlewareAxios from "@/utils/axios-interceptor";
import { revalidatePath } from "next/cache";

export async function getAllProducts() {
  try {
    let allProductResponse = await middlewareAxios.post(
      `/api/products/get-all-product`,
      {
        page: 1,
        size: 20,
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
      message: error.response.data.message,
      error: true,
    };
  }
}

export async function addProduct(formData: AddProductProps) {
  // const session = getSession();

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
      message: error.response.data.message,
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
      message: error.response.data.message,
      error: true,
    };
  }
}
