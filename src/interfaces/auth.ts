export interface LoginBodyProps {
  username: string;
  password: string;
}

export interface UserProfileProps {
  picture?: string;
  email: string;
  username: string;
  password?: string;
  gender: string;
  phoneNumber: string;
  dob: number;
}

export interface LoginAPIResponse {
  userId: string;
  token: string;
}
