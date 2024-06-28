import { createAsyncThunk } from "@reduxjs/toolkit";
import { login, getUserInfo } from "../../services/authService";

export const performLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }: { email: string; password: string }) => {
    const response = await login(email, password);
    return response;
  }
);

export const checkAuth = createAsyncThunk("auth/checkAuth", async () => {
  const response = await getUserInfo();
  return response;
});
