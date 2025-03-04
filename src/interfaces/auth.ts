export interface FormDataErrorProps {
  path: string;
  message: string;
}

export interface LoginBodyProps {
  username: string;
  password: string;
}

export interface LoginAPIResponse {
  userId: string;
  token: string;
}

export interface RegisterBodyProps {
  email: string;
  username: string;
  password: string;
  gender: "male" | "female";
  phoneNumber: string;
  dob: string;
}
