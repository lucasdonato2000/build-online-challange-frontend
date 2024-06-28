import { createAsyncThunk } from "@reduxjs/toolkit";
import {
  getContacts,
  updateContact as updateContactService,
  addContact as addContactService,
} from "../../services/contactService";
import { Contact } from "../../types";
import { setError } from "../reducers/errorReducer";

export const fetchContacts = createAsyncThunk(
  "contacts/fetchContacts",
  async (
    {
      limit,
      offset,
      searchTerm,
    }: { limit: number; offset: number; searchTerm: string },
    { dispatch }
  ) => {
    try {
      return await getContacts(limit, offset, searchTerm);
    } catch (error) {
      dispatch(setError({ message: "Failed to fetch contacts" }));
      throw error;
    }
  }
);
export const updateContact = createAsyncThunk(
  "contacts/updateContact",
  async (
    {
      id,
      changes,
      profilePictureFile,
    }: { id: number; changes: Partial<Contact>; profilePictureFile?: File },
    { dispatch }
  ) => {
    try {
      const response = await updateContactService(
        id,
        changes,
        profilePictureFile
      );
      return response;
    } catch (error) {
      dispatch(setError({ message: "Failed to fetch contacts" }));
      throw error;
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (
    {
      contact,
      profilePicture,
    }: { contact: Partial<Contact>; profilePicture?: File },
    { dispatch, rejectWithValue }
  ) => {
    try {
      const response = await addContactService(contact, profilePicture);
      return response;
    } catch (error: any) {
      const errorMessage = error.message || "Failed to add contact";

      dispatch(setError(errorMessage));
      return rejectWithValue(errorMessage);
    }
  }
);
