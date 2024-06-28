export interface PaginationProps {
  totalContacts: number;
  contactsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}

export interface InputFieldProps {
  type: string;
  name: string;
  value?: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  className?: string;
  hideValue?: boolean;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}
