import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <div className="flex items-center border rounded-md overflow-hidden">
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="px-3 py-2 w-full focus:outline-none"
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
