"use server";

import middlewareAxios from "@/utils/axios-interceptor";

export interface ActivityProps {
  id: string;
  username: string;
  date: number;
  activity: string;
}
export interface GetHistoryResponseProps {
  object: ActivityProps[];
  total: number;
  page: number;
  size: number;
  totalPages: number;
}

export async function getAllHistory() {
  try {
    let getHistoryResponse = await middlewareAxios.post(
      `/api/activity/get-all-activity`,
      {
        page: 1,
        size: 40,
      },
    );
    console.log(getHistoryResponse, "get history response");
    return {
      data: getHistoryResponse.data.data as GetHistoryResponseProps,
      message: getHistoryResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get history response");
    return {
      data: {} as GetHistoryResponseProps,
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
