import { createAsyncThunk } from "@reduxjs/toolkit";
import { Note } from "../../types";
import noteService from "../../services/noteService";
import { RootState } from "../store";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { getState }) => {
    const state = getState() as RootState;
    const { searchTerm, notesPerPage, currentPage } = state.notes;
    const offset = (currentPage - 1) * notesPerPage;
    const response = await noteService.getNotes(
      notesPerPage,
      offset,
      searchTerm
    );
    return response;
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (noteData: { note: Partial<Note>; contactId: string }) => {
    const { note, contactId } = noteData;
    const response = await noteService.addNote(note, contactId);
    return response;
  }
);
