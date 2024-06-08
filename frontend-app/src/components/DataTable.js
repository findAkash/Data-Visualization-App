import React, { useState } from 'react';
import SpeciesTable from './SpeciesTable';

const DataTable = ({ data, searchQuery }) => {
  const filteredData = data.filter((item) =>
    item.name.toLowerCase().includes(searchQuery.toLowerCase())
  );
  return (
    <div className="overflow-x-auto">
      <div className="relative bg-white border border-gray-200 rounded-lg">
        <div className="">
          <SpeciesTable data={filteredData} />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
