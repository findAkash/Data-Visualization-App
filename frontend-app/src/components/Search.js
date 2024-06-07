import React from 'react';

const Search = ({ search, setSearch }) => {
  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        placeholder="Search"
      />
    </div>
  );
};

export default Search;
