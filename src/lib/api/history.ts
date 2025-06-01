"use server";

import middlewareAxios from "@/utils/axios-interceptor";

export async function getAllHistory() {
  try {
    let getHistoryResponse = await middlewareAxios.post(
      `/api/activity/get-all-activity`,
      {
        page: 1,
        size: 20,
      },
    );
    console.log(getHistoryResponse, "get history response");
    return {
      data: getHistoryResponse.data.data,
      message: getHistoryResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get history response");
    return {
      data: {},
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
