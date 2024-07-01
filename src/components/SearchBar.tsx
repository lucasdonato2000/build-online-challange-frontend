import React, { useCallback } from "react";
import { FaSearch } from "react-icons/fa";
import debounce from "lodash/debounce";
import { SearchBarProps } from "../types";

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  const debouncedSetSearchTerm = useCallback(
    debounce((term: string) => setSearchTerm(term), 300),
    []
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    debouncedSetSearchTerm(e.target.value);
  };

  return (
    <div className="w-full mb-8 sm:mb-12 px-4 sm:px-10 relative">
      <div className="relative">
        <input
          type="text"
          defaultValue={searchTerm}
          onChange={handleInputChange}
          className="w-full p-2 pr-10 pl-3 border border-gray-600 rounded-md bg-custom-gray text-white focus:outline-none focus:border-custom-green"
          placeholder="Search contacts..."
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
