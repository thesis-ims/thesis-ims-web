export interface FormDataErrorProps {
  path: string;
  message: string;
}

export interface LoginBodyProps {
  username: string;
  password: string;
}

export interface RegisterBodyProps {
  email: string;
  username: string;
  password: string;
  gender: string;
  phoneNumber: string;
  dob: number;
}

export interface LoginAPIResponse {
  userId: string;
  token: string;
}
