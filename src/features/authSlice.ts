import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  isLoggedIn: boolean;
  email: string;
}

const initialState: AuthState = {
  isLoggedIn: false,
  email: "",
};

export const authSlice = createSlice({
  name: "counter",

  initialState,
  reducers: {
    login: (state, action: PayloadAction<AuthState>) => {
      state.isLoggedIn = action.payload.isLoggedIn;
      state.email = action.payload.email;
    },
    logout: (state) => {
      state.isLoggedIn = false;
      state.email = "";
    },
  },
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;
