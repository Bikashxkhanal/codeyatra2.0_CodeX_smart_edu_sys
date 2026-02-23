import React, { useEffect, useState } from "react";
import { Search, X } from "lucide-react";

const SearchBar = ({
  value = "",
  onChange,
  onSearch,
  placeholder = "Search...",
  isLoading = false,
  debounceTime = 500,
  className = "",
}) => {
  const [internalValue, setInternalValue] = useState(value);

  // Sync external value
  useEffect(() => {
    setInternalValue(value);
  }, [value]);

  // Debounce search
  useEffect(() => {
    const handler = setTimeout(() => {
      if (onSearch) onSearch(internalValue);
    }, debounceTime);

    return () => clearTimeout(handler);
  }, [internalValue, debounceTime, onSearch]);

  const handleClear = () => {
    setInternalValue("");
    if (onChange) onChange("");
    if (onSearch) onSearch("");
  };

  return (
    <div className={`relative w-full max-w-md ${className}`}>
      <div className="flex items-center bg-white border rounded-xl shadow-sm px-4 py-2 focus-within:ring-2 focus-within:ring-blue-500 transition">
        
        <Search size={18} className="text-gray-400 mr-2" />

        <input
          type="text"
          value={internalValue}
          onChange={(e) => {
            setInternalValue(e.target.value);
            if (onChange) onChange(e.target.value);
          }}
          placeholder={placeholder}
          className="flex-1 outline-none bg-transparent text-sm"
        />

        {isLoading && (
          <div className="w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
        )}

        {internalValue && !isLoading && (
          <button
            onClick={handleClear}
            className="ml-2 text-gray-400 hover:text-red-500 transition"
          >
            <X size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;