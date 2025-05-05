import { AddProductProps } from "@/interfaces/product";
import middlewareAxios from "@/utils/axios-interceptor";

export async function getAllProducts() {
  try {
    let allProductResponse = await middlewareAxios.post(
      `/api/products/get-all-product`,
      {},
    );

    console.log(allProductResponse, "get all product response");
    return {
      data: {},
      message: allProductResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get all product id");
    return {
      data: {},
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
      {},
      // {
      //   headers: {
      //     "Content-Type": "application/json",
      //     Authorization: `Bearer ${session?.token}`,
      //   },
      // },
    );

    console.log(addProductResponse, "add product response");
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
