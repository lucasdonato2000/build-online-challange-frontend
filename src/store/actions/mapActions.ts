import { createAsyncThunk } from "@reduxjs/toolkit";
import { setError } from "../reducers/errorReducer";

export const fetchMapCenter = createAsyncThunk(
  "map/fetchMapCenter",
  async (address: string, { dispatch }) => {
    try {
      const response = await fetch(
        `/api/maps?address=${encodeURIComponent(address)}`
      );
      const data = await response.json();
      return data.location;
    } catch (error) {
      dispatch(setError({ message: "Failed to fetch the map" }));
    }
  }
);
