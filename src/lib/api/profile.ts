import { LoginAPIResponse } from "@/interfaces/auth";
import { ProfileProps } from "@/interfaces/profile";
import axios from "axios";
import { cookies } from "next/headers";

const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export async function getUserbyUserId(userId: string) {
  const cookie = cookies();
  const session: LoginAPIResponse = JSON.parse(cookie.get("session")?.value!);

  try {
    let profileResponse = await axios.post(
      `${baseApiUrl}/api/users/get-user`,
      {
        userId: userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
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

export async function getUserProfile() {
  const cookie = cookies();
  const session: LoginAPIResponse = JSON.parse(cookie.get("session")?.value!);

  try {
    let profileResponse = await axios.post(
      `${baseApiUrl}/api/users/get-user`,
      {
        userId: session.userId,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${session.token}`,
        },
      }
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
