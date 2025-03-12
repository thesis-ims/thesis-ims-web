import {
  LoginAPIResponse,
  LoginBodyProps,
  RegisterBodyProps,
} from "@/interfaces/auth";
import axios from "axios";
const baseApiUrl = process.env.NEXT_PUBLIC_BASE_API_ENDPOINT;

export async function register(body: RegisterBodyProps) {
  try {
    let registerResponse = await axios.post(`${baseApiUrl}/api/auth/register`, {
      email: body.email,
      username: body.username,
      password: body.password,
      gender: body.gender,
      phoneNumber: body.phoneNumber,
      dob: "",
    });
    console.log(registerResponse, "register response");
    return {
      message: "Berhasil Register",
      error: false,
    };
  } catch (error: any) {
    console.log(error, "error register response");
    return {
      message: error.response.data.message,
      error: true,
    };
  }
}

export async function login(body: LoginBodyProps) {
  try {
    let loginResponse = await axios.post(
      `${baseApiUrl}/api/auth/login`,
      {
        username: body.username,
        password: body.password,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      },
    );
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
      message: error.response.data.message,
      error: true,
    };
  }
}
