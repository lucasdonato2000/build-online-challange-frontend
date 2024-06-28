import { createSlice } from "@reduxjs/toolkit";
import { AuthState } from "../../types/authTypes";
import { performLogin, checkAuth } from "../actions/authActions";

const initialState: AuthState = {
  isAuthChecked: false,
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(performLogin.pending, (state) => {
        state.loading = true;
      })
      .addCase(performLogin.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(performLogin.rejected, (state, action) => {
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.error.message || "Login failed";
      })
      .addCase(checkAuth.pending, (state) => {
        state.loading = true;
      })
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.loading = false;
        state.error = action.error.message || "Authentication check failed";
      });
  },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
