import React from "react";

const SearchBar = () => {
  return (
    <input
      type="text"
      placeholder="Search..."
      className="border rounded-lg px-4 py-2 w-64 focus:outline-none focus:ring-2 focus:ring-green-500"
    />
  );
};

export default SearchBar;