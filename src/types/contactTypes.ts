export interface Contact {
  id: number;
  name: string;
  email: string;
  title: string;
  profilePicture: string;
  address: string;
  phone: string;
}

export interface ContactState {
  contacts: Contact[];
  filteredContacts: Contact[];
  searchTerm: string;
  loading: boolean;
  total: number;
  error: { [key: string]: string } | null;
}
export interface ContactListProps {
  searchTerm: string;
  contactsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
  onSelectContact: (contact: Contact) => void;
}

export interface SelectedContactState {
  selectedContact: Contact | null;
}

export interface ContactDetailProps {
  contact: Contact | null;
  isEditing: boolean;
  setIsEditing: (editing: boolean) => void;
  onEdit: (contact: Contact) => void;
}

export interface EditContactProps {
  contact: Contact;
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export interface AddContactProps {
  onSave: (contact: Contact) => void;
  onCancel: () => void;
}

export interface ButtonProps {
  href?: string;
  children: React.ReactNode;
  className?: string;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
  disabled?: boolean;
}

export interface ContactsResponse {
  total: number;
  contacts: Contact[];
}

export interface EditedContactState {
  editedContact: Partial<Contact> | null;
  changes: Partial<Contact>;
  loading: boolean;
  error: { [key: string]: string } | null;
}
