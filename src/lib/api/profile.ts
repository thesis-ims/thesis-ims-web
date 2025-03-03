import { LoginAPIResponse } from "@/interfaces/auth";
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
        userId: "3175e12b-477f-4040-ab38-15f0ba46ef9e",
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
      data: profileResponse.data,
      message: "profile user",
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error get profile by id");
    return {
      data: {},
      message: error.response.data.message,
      error: true,
    };
  }
}
