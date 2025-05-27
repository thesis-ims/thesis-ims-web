"use server";

import { ChangePasswordProps, ProfileProps } from "@/interfaces/profile";
import { getSession } from "../auth/get-session";
import middlewareAxios from "@/utils/axios-interceptor";
import { revalidatePath } from "next/cache";

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
      message: error?.response?.data?.message,
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
      message: error?.response?.data?.message,
      error: true,
    };
  }
}

export async function updateProfile(body: ProfileProps) {
  console.log(body, "update user body");
  try {
    let updateProfileResponse = await middlewareAxios.post(
      `/api/users/update`,
      {
        userId: body.id,
        gender: body.gender,
        phoneNumber: body.phoneNumber,
        dob: body.dob,
        image: body.image,
        email: body.email,
        username: body.username,
      },
    );
    console.log(updateProfileResponse, "update profile response");
    revalidatePath("/settings");
    return {
      message: updateProfileResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error update profile response");
    return {
      message: error?.response?.data?.message,
      error: true,
    };
  }
}

export async function changePassword({
  id,
  body,
}: {
  body: ChangePasswordProps;
  id: string;
}) {
  try {
    let changePasswordResponse = await middlewareAxios.post(
      `/api/auth/change-password`,
      {
        userId: id,
        currentPassword: body.oldPassword,
        newPassword: body.newPassword,
      },
    );
    console.log(changePasswordResponse, "change password response");
    revalidatePath("/settings");
    return {
      message: changePasswordResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error change password response");
    return {
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
