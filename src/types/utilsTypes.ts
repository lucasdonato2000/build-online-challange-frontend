import { FieldProps } from "formik";
import { Contact } from "./contactTypes";

export interface PaginationProps {
  totalItems: number;
  itemsPerPage: number;
  currentPage: number;
  onPageChange: (page: number) => void;
}
export interface InputFieldProps {
  type: string;
  name: string;
  value?: string;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;
  placeholder?: string;
  className?: string;
  hideValue?: boolean;
}

export interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export interface MapTooltipProps {
  mapCenter: {
    lat: number;
    lng: number;
  } | null;
  showMap: boolean;
  isLoaded: boolean;
}

export interface MapState {
  mapCenter: { lat: number; lng: number } | null;
  showMap: boolean;
  isLoaded: boolean;
}

export interface CustomDropdownProps extends FieldProps {
  contacts: Contact[];
  defaultAvatar: string;
  handleContactChange: (value: string) => void;
  className?: string;
}

export interface BottomNavBarProps {
  activeTab: "contacts" | "notes";
}
