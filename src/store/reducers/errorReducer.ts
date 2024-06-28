import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ErrorState } from "../../types/errorTypes";

const initialState: ErrorState = {
  message: null,
  fieldErrors: null,
};

const errorSlice = createSlice({
  name: "error",
  initialState,
  reducers: {
    setError: (
      state,
      action: PayloadAction<{
        message: string;
        fieldErrors?: { [key: string]: string };
      }>
    ) => {
      state.message = action.payload.message;
      state.fieldErrors = action.payload.fieldErrors || null;
    },
    clearError: (state) => {
      state.message = null;
      state.fieldErrors = null;
    },
  },
});

export const { setError, clearError } = errorSlice.actions;
export default errorSlice.reducer;
