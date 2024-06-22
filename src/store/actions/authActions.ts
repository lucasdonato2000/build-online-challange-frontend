import { createAsyncThunk } from "@reduxjs/toolkit";
import { getUserInfo } from "../../services/userService";
import { startLoading, stopLoading } from "../reducers/loadingReducer";

export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { dispatch }) => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        dispatch(startLoading());
        const userInfo = await getUserInfo();
        return userInfo;
      } catch (error) {
        localStorage.removeItem("token");
        throw error;
      } finally {
        dispatch(stopLoading());
      }
    }
    return null;
  }
);
