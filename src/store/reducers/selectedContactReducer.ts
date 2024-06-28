import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Contact, SelectedContactState } from "../../types";

const initialState: SelectedContactState = {
  selectedContact: null,
};

const selectedContactSlice = createSlice({
  name: "selectedContact",
  initialState,
  reducers: {
    selectContact: (state, action: PayloadAction<Contact>) => {
      state.selectedContact = action.payload;
    },
    clearSelectedContact: (state) => {
      state.selectedContact = null;
    },
  },
});

export const { selectContact, clearSelectedContact } =
  selectedContactSlice.actions;

export default selectedContactSlice.reducer;
