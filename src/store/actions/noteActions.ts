import { createAsyncThunk } from "@reduxjs/toolkit";
import { Note } from "../../types";
import noteService from "../../services/noteService";
import { RootState } from "../store";
import { setError } from "../reducers/errorReducer";

export const fetchNotes = createAsyncThunk(
  "notes/fetchNotes",
  async (_, { getState, dispatch }) => {
    const state = getState() as RootState;
    const { searchTerm, notesPerPage, currentPage } = state.notes;
    const offset = (currentPage - 1) * notesPerPage;
    try {
      const response = await noteService.getNotes(
        notesPerPage,
        offset,
        searchTerm
      );
      return response;
    } catch (error) {
      dispatch(
        setError({
          message:
            error instanceof Error ? error.message : "Failed to fetch notes",
        })
      );

      throw error;
    }
  }
);

export const addNote = createAsyncThunk(
  "notes/addNote",
  async (
    noteData: { note: Partial<Note>; contactId: string },
    { dispatch }
  ) => {
    const { note, contactId } = noteData;
    try {
      const response = await noteService.addNote(note, contactId);
      return response;
    } catch (error) {
      dispatch(
        setError({
          message:
            error instanceof Error ? error.message : "Failed to create a note",
        })
      );
      throw error;
    }
  }
);
