import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { getContacts } from "../../services/contactService";

interface Contact {
  id: number;
  name: string;
  email: string;
  title: string;
  profilePicture: string;
}

interface ContactState {
  contacts: Contact[];
  filteredContacts: Contact[];
  searchTerm: string;
  loading: boolean;
}

const initialState: ContactState = {
  contacts: [],
  filteredContacts: [],
  searchTerm: "",
  loading: false,
};

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async () => {
    const response = await getContacts();
    return response;
  }
);

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
        (state, action: PayloadAction<Contact[]>) => {
          state.contacts = action.payload;
          state.filteredContacts = action.payload;
          state.loading = false;
        }
      )
      .addCase(fetchContacts.rejected, (state) => {
        state.loading = false;
      });
  },
});

export const { setSearchTerm } = contactSlice.actions;
export default contactSlice.reducer;
