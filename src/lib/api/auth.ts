import {
  LoginAPIResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from "@/interfaces/auth";
import middlewareAxios from "@/utils/axios-interceptor";

export async function register(body: RegisterBodyProps) {
  // console.log(body, "register body");
  try {
    let registerResponse = await middlewareAxios.post(`/api/auth/register`, {
      email: body.email,
      username: body.username,
      password: body.password,
      gender: body.gender,
      phoneNumber: body.phoneNumber,
    });
    console.log(registerResponse, "register response");
    return {
      message: registerResponse.data.message,
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error register response");
    return {
      message: error?.response?.data?.message,
      error: true,
    };
  }
}

export async function login(body: LoginBodyProps) {
  try {
    let loginResponse = await middlewareAxios.post(`/api/auth/login`, {
      username: body.username,
      password: body.password,
    });
    console.log(loginResponse, "login response");
    return {
      data: loginResponse.data.data as LoginAPIResponse,
      message: "Berhasil Login",
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error login response");
    return {
      data: {} as LoginAPIResponse,
      message: error?.response?.data?.message,
      error: true,
    };
  }
}
