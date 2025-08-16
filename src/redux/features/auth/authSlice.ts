// File: src/redux/features/auth/authSlice.ts
import {
  authAccessKey,
  authEmailVerifiedKey,
  authRefreshKey,
} from "@/constant/authkey";
import { RootState } from "@/redux/store";
import { getCookie, removeCookie, setCookie } from "@/utils/cookieHelper";
import { decodeToken, TUser } from "@/utils/tokenHelper";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type TAuthState = {
  user: TUser | null;
  acesstoken: string | null;
  refreshtoken: string | null;
};

// Retrieve token from cookies
const storedAccessToken = getCookie(authAccessKey);
const storedRefreshToken = getCookie(authRefreshKey);
const storedUser = decodeToken(storedAccessToken); // Decode user from token

const initialState: TAuthState = {
  user: storedUser,
  acesstoken: storedAccessToken,
  refreshtoken: storedRefreshToken,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<TAuthState>) => {
      const { user, acesstoken, refreshtoken } = action.payload;
      state.user = user;
      state.acesstoken = acesstoken;
      state.refreshtoken = refreshtoken;
      if (acesstoken && refreshtoken) {
        setCookie(authAccessKey, acesstoken);
        setCookie(authRefreshKey, refreshtoken);
        setCookie(authEmailVerifiedKey, user?.emailVerified ? "true" : "false");
      }
    },
    updateUser: (state, action: PayloadAction<TAuthState>) => {
      const { user, acesstoken, refreshtoken } = action.payload;
      state.user = user;
      state.acesstoken = acesstoken;
      state.refreshtoken = refreshtoken;
      if (acesstoken && refreshtoken) {
        setCookie(authAccessKey, acesstoken);
        setCookie(authRefreshKey, refreshtoken);
        setCookie(authEmailVerifiedKey, user?.emailVerified ? "true" : "false");
      }
    },
    logout: (state) => {
      try {
        state.user = null;
        state.acesstoken = null;
        state.refreshtoken = null;
        removeCookie(authAccessKey);
        removeCookie(authRefreshKey);
        removeCookie(authEmailVerifiedKey);
      } catch (error) {
        console.error("Error during logout:", error);
        // Fallback: ensure state is cleared even if there's an error
        state.user = null;
        state.acesstoken = null;
        state.refreshtoken = null;
        removeCookie(authAccessKey);
        removeCookie(authRefreshKey);
        removeCookie(authEmailVerifiedKey);
      }
    },
  },
});

export const { setUser, logout, updateUser } = authSlice.actions;
export default authSlice.reducer;

// Selectors
export const selectCurrentToken = (state: RootState) => state.auth.acesstoken;
export const selectCurrentUser = (state: RootState) => state.auth.user;
