import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addContact } from "../actions/contactActions";
import { Contact, EditedContactState } from "../../types";

const initialState: EditedContactState = {
  editedContact: null,
  changes: {},
  loading: false,
  error: null,
};

const editedContactSlice = createSlice({
  name: "editedContact",
  initialState,
  reducers: {
    setEditedContact(state, action: PayloadAction<Partial<Contact>>) {
      state.editedContact = action.payload;
    },
    updateEditedContact(state, action: PayloadAction<Partial<Contact>>) {
      state.changes = { ...state.changes, ...action.payload };
    },
    resetEditedContact(state) {
      state.editedContact = null;
      state.changes = {};
      state.error = null;
    },
    setLoading(state, action: PayloadAction<boolean>) {
      state.loading = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addContact.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(addContact.fulfilled, (state) => {
        state.loading = false;
      })
      .addCase(addContact.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { [key: string]: string }; // Handle specific field errors
      });
  },
});

export const {
  setEditedContact,
  updateEditedContact,
  resetEditedContact,
  setLoading,
} = editedContactSlice.actions;
export default editedContactSlice.reducer;
