import React, { useState } from 'react';
import SpeciesTable from './SpeciesTable';

const DataTable = ({ data }) => {
  return (
    <div className="overflow-x-auto">
      <div className="relative bg-white border border-gray-200 rounded-lg">
        <div className="">
          <SpeciesTable data={data} />
        </div>
      </div>
    </div>
  );
};

export default DataTable;
