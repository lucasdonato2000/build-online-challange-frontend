import React from "react";
import { FaSearch } from "react-icons/fa";

interface SearchBarProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, setSearchTerm }) => {
  return (
    <div className="w-full mb-12 px-10 relative">
      <div className="relative">
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full p-2 pr-10 pl-3 border border-gray-600 rounded-md bg-custom-grey text-white focus:outline-none focus:border-custom-green"
          placeholder="Search contacts..."
        />
        <FaSearch className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
      </div>
    </div>
  );
};

export default SearchBar;
