import noteRepository from "../repositories/noteRepository";
import { Note } from "../types";
import { handleServiceError } from "../utils/errorHandler";

export const getNotes = async (
  limit: number,
  offset: number,
  searchTerm: string
): Promise<{ total: number; notes: Note[] } | undefined> => {
  try {
    return await noteRepository.getNotes(limit, offset, searchTerm);
  } catch (error) {
    handleServiceError(error);
  }
};

export const addNote = async (
  note: Partial<Note>,
  contactId: string
): Promise<Note | undefined> => {
  try {
    return await noteRepository.addNote(note, contactId);
  } catch (error) {
    handleServiceError(error);
  }
};

export default { getNotes, addNote };
