import { useState, useEffect, useRef, useCallback } from "react";
import { searchLocation } from "../api/locationApi";

const LocationSearch = ({
  label,
  placeholder,
  value,
  onChange,
  icon,
  showGpsButton = false,
  onGpsClick,
  gpsLoading = false,
  gpsError = "",
}) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [isOpen, setIsOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const inputRef = useRef(null);
  const containerRef = useRef(null);
  const debounceRef = useRef(null);

  // Update query when value changes externally
  useEffect(() => {
    if (value && !isOpen) {
      setQuery(value);
    }
  }, [value, isOpen]);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setIsOpen(false);
        if (value) setQuery(value);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [value]);

  const fetchSuggestions = useCallback(async (searchQuery) => {
    if (!searchQuery || searchQuery.length < 2) {
      setSuggestions([]);
      return;
    }

    setLoading(true);
    try {
      const results = await searchLocation(searchQuery);
      setSuggestions(results);
    } catch (error) {
      console.error("Search error:", error);
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleInputChange = (e) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    setIsOpen(true);
    setHighlightedIndex(-1);

    // Clear confirmed location while typing
    onChange("");

    // Debounce search
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(() => {
      fetchSuggestions(newQuery);
    }, 600);
  };

  const handleSelect = (suggestion) => {
    setQuery(suggestion.display_name);
    setIsOpen(false);
    onChange(suggestion.display_name);
    inputRef.current?.blur();
  };

  const handleClear = () => {
    setQuery("");
    setSuggestions([]);
    setIsOpen(false);
    onChange("");
    inputRef.current?.focus();
  };

  const handleKeyDown = (e) => {
    if (!isOpen) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < suggestions.length - 1 ? prev + 1 : prev,
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : -1));
        break;
      case "Enter":
        e.preventDefault();
        if (highlightedIndex >= 0 && suggestions[highlightedIndex]) {
          handleSelect(suggestions[highlightedIndex]);
        }
        break;
      case "Escape":
        setIsOpen(false);
        break;
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <div className="flex items-center gap-3">
        <div className="flex-1 relative">
          <div className="absolute left-0 top-1/2 -translate-y-1/2 text-gray-400">
            {icon}
          </div>

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={handleInputChange}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (query.length >= 2) {
                setIsOpen(true);
                fetchSuggestions(query);
              }
            }}
            placeholder={placeholder}
            className="w-full bg-transparent border-none outline-none text-gray-900 placeholder-gray-400 py-3 pl-8 pr-8 font-sans text-base"
          />

          {query && (
            <button
              onClick={handleClear}
              className="absolute right-0 top-1/2 -translate-y-1/2 w-6 h-6 flex items-center justify-center rounded-full bg-gray-200 hover:bg-gray-300 transition-colors text-gray-500 text-xs"
            >
              ✕
            </button>
          )}
        </div>

        {showGpsButton && (
          <button
            onClick={onGpsClick}
            disabled={gpsLoading}
            className={`flex-shrink-0 w-10 h-10 rounded-2xl flex items-center justify-center transition-all ${
              gpsLoading
                ? "bg-gray-100 text-gray-400"
                : "bg-teal-50 text-teal-600 hover:bg-teal-100"
            }`}
            title="Use current location"
          >
            {gpsLoading ? (
              <div className="w-4 h-4 border-2 border-teal-600 border-t-transparent rounded-full animate-spin" />
            ) : (
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
            )}
          </button>
        )}
      </div>

      {gpsError && <p className="text-xs text-red-500 mt-1 ml-8">{gpsError}</p>}

      {/* Dropdown */}
      {isOpen && query.length >= 2 && (
        <div className="absolute top-full left-0 right-0 mt-2 glass-strong rounded-2xl shadow-2xl overflow-hidden z-50 animate-slide-down">
          {loading ? (
            <div className="p-4 text-center text-gray-500 text-sm">
              <div className="w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full animate-spin mx-auto mb-2" />
              Searching...
            </div>
          ) : suggestions.length > 0 ? (
            <ul className="max-h-64 overflow-y-auto py-2">
              {suggestions.map((suggestion, index) => (
                <li
                  key={suggestion.place_id}
                  onClick={() => handleSelect(suggestion)}
                  className={`px-4 py-3 cursor-pointer transition-colors ${
                    index === highlightedIndex
                      ? "bg-teal-50"
                      : "hover:bg-gray-50"
                  }`}
                >
                  <p className="text-sm font-medium text-gray-900">
                    {suggestion.display_name}
                  </p>
                  <p className="text-xs text-gray-500 mt-0.5 truncate">
                    {suggestion.full_name}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <div className="p-4 text-center text-gray-500 text-sm">
              No locations found
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default LocationSearch;
