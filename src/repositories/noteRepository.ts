import api from "../services/api";
import { Note } from "../types";

const getNotes = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<{ total: number; notes: Note[] }> => {
  const response = await api.get("/notes", {
    params: {
      limit,
      offset,
      searchTerm,
    },
  });
  return response.data;
};

const addNote = async (
  note: Partial<Note>,
  contactId: string
): Promise<Note> => {
  const response = await api.post(`/contacts/${contactId}/notes`, note);
  return response.data;
};

export default { getNotes, addNote };
