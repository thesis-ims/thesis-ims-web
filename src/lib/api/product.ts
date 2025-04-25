import axios from "axios";
import { getSession } from "../auth/get-session";

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export async function getAllProducts() {
  const session = getSession();

  try {
    let allProductResponse = await axios.post(
      `${baseApiUrl}/api/products/get-all-product`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
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

export async function addProduct() {
  const session = getSession();

  try {
    let addProductResponse = await axios.post(
      `${baseApiUrl}/api/products/insert`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
    );

    console.log(addProductResponse, "get all product response");
    return {
      data: {},
      message: addProductResponse.data.message,
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

export async function updateProduct() {
  const session = getSession();

  try {
    let updateProductResponse = await axios.post(
      `${baseApiUrl}/api/products/update`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
    );

    console.log(updateProductResponse, "get all product response");
    return {
      data: {},
      message: updateProductResponse.data.message,
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

export async function deleteProduct() {
  const session = getSession();

  try {
    let deleteProductResponse = await axios.post(
      `${baseApiUrl}/api/products/delete`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
    );

    console.log(deleteProductResponse, "get all product response");
    return {
      data: {},
      message: deleteProductResponse.data.message,
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
