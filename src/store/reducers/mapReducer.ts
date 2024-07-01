import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { MapState } from "../../types";
import { fetchMapCenter } from "../actions";

const initialState: MapState = {
  mapCenter: null,
  showMap: false,
  isLoaded: false,
};

export const mapSlice = createSlice({
  name: "map",
  initialState,
  reducers: {
    setShowMap: (state, action: PayloadAction<boolean>) => {
      state.showMap = action.payload;
    },
    setMapLoaded: (state, action: PayloadAction<boolean>) => {
      state.isLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchMapCenter.fulfilled, (state, action) => {
      state.mapCenter = action.payload;
    });
  },
});

export const { setShowMap, setMapLoaded } = mapSlice.actions;

export default mapSlice.reducer;
