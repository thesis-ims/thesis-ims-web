export interface ProfileProps {
  id: string;
  image: string;
  email: string;
  username: string;
  password: string;
  gender: string;
  phoneNumber: string;
  dob: number;
  enabled: boolean;
  roles: string[];
}

export interface ChangePasswordProps {
  oldPassword: string;
  newPassword: string;
  newPasswordConfirmation: string;
}
