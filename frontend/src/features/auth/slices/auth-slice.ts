import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import Cookie from "js-cookie";

import { storage } from "@/utils";

import { RootState } from "@/store";

interface User {
  first_name: string;
  last_name: string;
  fullName: string;
}

interface AuthState {
  user: User | null;
  access_token: string | null;
  isAuthenticated: boolean;
}

const initialState: AuthState = {
  user: storage["localStorage"].get<User>("tech_unit_user_profile") || null,
  access_token: storage["cookieStorage"].get("tech_unit_access_token") || null,
} as {
  token: any;
  user: null | any;
  access_token: string | null;
  isAuthenticated: boolean;
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (
      state,
      {
        payload: { user, access_token, rememberMe },
      }: PayloadAction<{
        user: User;
        access_token: string;
        rememberMe: boolean;
      }>
    ) => {
      state.user = user;
      state.access_token = access_token;
      storage["cookieStorage"].set("tech_unit_access_token", access_token, {
        expires: rememberMe ? 14 : undefined,
        secure: true,
        sameSite: "Strict",
      });
      storage["localStorage"].set("tech_unit_user_profile", user);
    },
    logout: (state) => {
      state.access_token = null;
      state.user = null;
      storage["cookieStorage"].remove("tech_unit_access_token");
      storage["localStorage"].remove("tech_unit_user_profile");
    },
  },
  extraReducers: (builder) => {
    builder;
    // .addMatcher(AuthService.endpoints.login.matchPending, (state, action) => {
    // 	console.log('pending', action)
    // })
    // .addMatcher(AuthService.endpoints.login.matchFulfilled, (state, action) => {
    // 	console.log('fulfilled', action)

    // 	state.user = action.payload.data.user
    // 	state.access_token = action.payload.data.access_token
    // })
    // .addMatcher(AuthService.endpoints.login.matchRejected, (state, action) => {
    // 	console.log('rejected', action)
    // })
  },
});

const { reducer, actions } = authSlice;

export const { logout, setCredentials } = actions;

export const authState = reducer;

export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectToken = (state: RootState) => state.auth.access_token;
// export const selectUserType = (state: RootState) => state.auth.userType;
// export const selectIsAuthenticated = (state: RootState) => state.auth.isAuthenticated
