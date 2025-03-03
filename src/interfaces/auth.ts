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
  gender: string;
  phoneNumber: string;
  dob: string;
}
