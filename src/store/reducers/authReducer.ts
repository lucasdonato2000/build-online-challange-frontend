import { createSlice } from "@reduxjs/toolkit";
import { checkAuth } from "../actions/authActions";

interface AuthState {
  isAuthChecked: boolean;
  isAuthenticated: boolean;
  user: any | null;
  loading: boolean;
  error: string | null;
}

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
    startLoading: (state) => {
      state.loading = true;
    },
    stopLoading: (state) => {
      state.loading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(checkAuth.fulfilled, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = !!action.payload;
        state.user = action.payload;
        state.error = null;
      })
      .addCase(checkAuth.rejected, (state, action) => {
        state.isAuthChecked = true;
        state.isAuthenticated = false;
        state.user = null;
        state.error = action.error.message || null;
      });
  },
});

export const { startLoading, stopLoading } = authSlice.actions;

export default authSlice.reducer;
