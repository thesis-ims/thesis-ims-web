export interface ProfileProps {
  id: string;
  email: string;
  username: string;
  password: string | null;
  gender: "male" | "female";
  phoneNumber: string;
  dob: string;
  enabled: boolean;
  roles: string[];
}
