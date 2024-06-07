import React from 'react';

const FilterButton = ({ onClick, filterType }) => {
  return (
    <button
      className="text-xs px-2 py-1 rounded-md hover:bg-gray-200 focus:outline-none"
      onClick={onClick}
    >
      Filter
    </button>
  );
};

export default FilterButton;
