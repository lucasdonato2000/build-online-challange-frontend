import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Note, NoteState } from "../../types";
import { fetchNotes, addNote } from "../actions/noteActions";

const initialState: NoteState = {
  notes: [],
  loading: false,
  error: null,
  searchTerm: "",
  notesPerPage: 6,
  currentPage: 1,
  total: 0,
};

const noteSlice = createSlice({
  name: "notes",
  initialState,
  reducers: {
    setSearchTerm(state, action: PayloadAction<string>) {
      state.searchTerm = action.payload;
    },
    setNotesPerPage(state, action: PayloadAction<number>) {
      state.notesPerPage = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchNotes.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        fetchNotes.fulfilled,
        (
          state,
          action: PayloadAction<{ total: number; notes: Note[] } | undefined>
        ) => {
          state.loading = false;
          if (action.payload) {
            state.notes = action.payload.notes;
            state.total = action.payload.total;
          }
        }
      )
      .addCase(fetchNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to fetch notes";
      })
      .addCase(addNote.pending, (state) => {
        state.loading = true;
      })
      .addCase(
        addNote.fulfilled,
        (state, action: PayloadAction<Note | undefined>) => {
          state.loading = false;
          if (action.payload) {
            state.notes.push(action.payload);
          }
        }
      )
      .addCase(addNote.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Failed to add note";
      });
  },
});

export const { setSearchTerm, setNotesPerPage, setCurrentPage } =
  noteSlice.actions;
export default noteSlice.reducer;
