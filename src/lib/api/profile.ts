import { ProfileProps } from "@/interfaces/profile";
import axios from "axios";
import { getSession } from "../auth/get-session";
import middlewareAxios from "@/utils/axios-interceptor";

export async function getUserbyUserId(userId: string) {
  try {
    let profileResponse = await middlewareAxios.post(`/api/users/get-user`, {
      userId: userId,
    });

    console.log(profileResponse, "get profile by id response");
    return {
      data: profileResponse.data.data as ProfileProps,
      message: profileResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get profile by id");
    return {
      data: {} as ProfileProps,
      message: error.response.data.message,
      error: true,
    };
  }
}

export async function getUserProfile() {
  const session = await getSession();
  if (!session) {
    return {
      data: {} as ProfileProps,
      message: "You are not logged in",
      error: true,
    };
  }
  try {
    let profileResponse = await middlewareAxios.post(
      `/api/users/get-user`,
      {
        userId: session?.userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session?.token}`,
        },
      },
    );

    console.log(profileResponse, "get profile by id response");
    return {
      data: profileResponse.data.data as ProfileProps,
      message: profileResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get profile by id");
    return {
      data: {} as ProfileProps,
      message: error.response.data.message,
      error: true,
    };
  }
}
