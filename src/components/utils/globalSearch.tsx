import React, { useState, useEffect } from "react";

interface DebounceSearchInputProps {
  placeholder?: string;
  onSearch: (value: string) => void; // Callback for search query
  debounceDelay?: number; // Debounce delay in milliseconds
  className?: string; // Custom styling
  value: string; // Controlled input value
  onChange: (value: string) => void; // Update input value
}

const DebounceSearchInput: React.FC<DebounceSearchInputProps> = ({
  placeholder = "Search...",
  onSearch,
  debounceDelay = 800,
  className,
  value,
  onChange,
}) => {


  const handleClear = () => {
    onChange(""); // Clear the input value
    onSearch(""); // Immediately trigger search for an empty query
  };
  useEffect(() => {
    const handler = setTimeout(() => {
      onSearch(value); // Trigger search when debounce completes
    }, debounceDelay);

    return () => {
      clearTimeout(handler); // Clear timeout on input change
    };
  }, [value, onSearch, debounceDelay]);

  return (
    <div className="flex items-center gap-2">
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)} // Update parent-controlled value
        className={className || "px-3 py-2 border rounded-md w-full"}
      />
      {/* {value && (
        <button
          onClick={() =>{ handleClear() } }// Clear the input
          className="px-3 py-1 bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300"
        >
          Clear
        </button>
      )} */}
    </div>
  );
};

export default DebounceSearchInput;
