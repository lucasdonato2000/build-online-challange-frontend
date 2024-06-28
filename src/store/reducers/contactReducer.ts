import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  updateContact,
  addContact,
} from "../actions/contactActions";
import { Contact, ContactState } from "../../types";

const initialState: ContactState = {
  contacts: [],
  filteredContacts: [],
  searchTerm: "",
  total: 0,
  loading: false,
};

const contactSlice = createSlice({
  name: "contacts",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
      state.filteredContacts = state.contacts.filter((contact) =>
        contact.name.toLowerCase().includes(action.payload.toLowerCase())
      );
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchContacts.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchContacts.fulfilled,
        (
          state,
          action: PayloadAction<
            { total: number; contacts: Contact[] } | undefined
          >
        ) => {
          state.contacts = action.payload?.contacts ?? [];
          state.total = action.payload?.total ?? 0;

          state.loading = false;
        }
      )
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      })
      .addCase(
        updateContact.fulfilled,
        (state, action: PayloadAction<Contact | undefined>) => {
          if (action.payload) {
            const index = state.contacts.findIndex(
              (contact) => contact.id === action.payload?.id
            );
            if (index !== -1) {
              state.contacts[index] = action.payload;
              state.filteredContacts = state.contacts;
            }
          }
        }
      )
      .addCase(
        addContact.fulfilled,
        (state, action: PayloadAction<Contact | undefined>) => {
          if (action.payload) {
            state.contacts.push(action.payload);
            state.filteredContacts = state.contacts;
          }
        }
      );
  },
});

export const { setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
