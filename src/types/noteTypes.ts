export interface Note {
  id?: string;
  userId?: string;
  contactId: string;
  content: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface NoteState {
  notes: Note[];
  loading: boolean;
  error: string | null;
  searchTerm: string;
  notesPerPage: number;
  currentPage: number;
  total: number;
}

export interface NoteListProps {
  searchTerm: string;
  notesPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectNote: (noteId: string | null) => void;
  isScreenSmall: boolean;
}

export interface AddNoteProps {
  onSave: () => void;
  onCancel: () => void;
}

export interface NoteDetailProps {
  noteId: string;
  onBack: () => void;
}
