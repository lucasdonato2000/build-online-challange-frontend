import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  fetchContacts,
  fetchContactById,
  updateContact,
  addContact,
  fetchAllContacts,
} from "../actions/contactActions";
import { Contact, ContactsResponse, ContactState } from "../../types";

const initialState: ContactState = {
  contacts: [],
  filteredContacts: [],
  searchTerm: "",
  total: 0,
  loading: false,
  error: null,
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
        state.error = null;
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
      .addCase(fetchContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { [key: string]: string };
      })
      .addCase(
        fetchContactById.fulfilled,
        (state, action: PayloadAction<Contact | undefined>) => {
          if (action.payload) {
            if (
              !state.contacts.find(
                (contact) => contact.id === action.payload?.id
              )
            )
              state.contacts.push(action.payload);
          }
        }
      )
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
      )
      .addCase(
        fetchAllContacts.fulfilled,
        (state, action: PayloadAction<ContactsResponse | undefined>) => {
          if (action.payload) state.contacts = action.payload.contacts;
          state.loading = false;
        }
      )
      .addCase(fetchAllContacts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as { [key: string]: string };
      });
  },
});

export const { setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
