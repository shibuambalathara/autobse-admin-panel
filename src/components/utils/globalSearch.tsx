import React from "react";
import { filterStyle } from "./style";

interface SearchByGlobalProps {
  value: string;
  onChange: (value: string) => void;
}

const SearchByGlobal: React.FC<SearchByGlobalProps> = ({ value, onChange }) => {
  return (
    <div className="flex items-center w-full max-w-xs space-x-2 p-1 rounded-md">
      <input
        type="text"
        value={value} // Controlled input
        placeholder="Search by city or state..."
        onChange={(e) => onChange(e.target.value)} // Pass input changes to parent
        className={`${filterStyle.data}`}
      />
    </div>
  );
};

export default SearchByGlobal;
