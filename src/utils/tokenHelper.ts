// File: src/utils/tokenHelper.ts
import { jwtDecode } from "jwt-decode";

export type TUser = {
  userId: string;
  email: string;
  role: string;
  emailVerified?: boolean;
  iat: number;
  exp: number;
};

// Decode JWT and get user details
export const decodeToken = (token: string | null): TUser | null => {
  if (!token) return null;
  try {
    return jwtDecode<TUser>(token);
  } catch (error) {
    console.error("Invalid token", error);
    return null;
  }
};
