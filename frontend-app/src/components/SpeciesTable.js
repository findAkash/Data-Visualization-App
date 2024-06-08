import React, { useState } from 'react';

const SortIcon = ({ isAscending }) => (
  <span className="ml-1">
    {isAscending ? (
      <i className="fas fa-sort-up"></i>
    ) : (
      <i className="fas fa-sort-down"></i>
    )}
  </span>
);

const MyTable = ({ data }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [sortBy, setSortBy] = useState('name');
  const [sortAscending, setSortAscending] = useState(true);

  const openModal = (image) => {
    setSelectedImage(image);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setSelectedImage(null);
    setIsModalOpen(false);
  };

  const handleSort = (key) => {
    if (sortBy === key) {
      setSortAscending(!sortAscending);
    } else {
      setSortBy(key);
      setSortAscending(true);
    }
  };

  const sortedData = sortBy
    ? data.sort((a, b) => {
        const aValue = a[sortBy];
        const bValue = b[sortBy];
        if (aValue < bValue) return sortAscending ? -1 : 1;
        if (aValue > bValue) return sortAscending ? 1 : -1;
        return 0;
      })
    : data;

  return (
    <>
      <table className="table-auto w-full">
        <thead>
          <tr className="bg-gray-800 text-white sticky top-0">
            <th
              className="px-1 py-2 cursor-pointer"
              onClick={() => handleSort('name')}
            >
              Name
              {sortBy === 'name' && <SortIcon isAscending={sortAscending} />}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('continent')}
            >
              Continent{' '}
              {sortBy === 'continent' && (
                <SortIcon isAscending={sortAscending} />
              )}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('weight')}
            >
              Weight{' '}
              {sortBy === 'weight' && <SortIcon isAscending={sortAscending} />}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('height')}
            >
              Height{' '}
              {sortBy === 'height' && <SortIcon isAscending={sortAscending} />}
            </th>
            <th
              className="px-4 py-2 cursor-pointer"
              onClick={() => handleSort('horns')}
            >
              Horns{' '}
              {sortBy === 'horns' && <SortIcon isAscending={sortAscending} />}
            </th>
            <th className="px-4 py-2">Picture</th>
          </tr>
        </thead>
        <tbody>
          {sortedData.map((species, index) => (
            <tr
              key={index}
              className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}
            >
              <td className="px-4 py-2">{species.name}</td>
              <td className="px-4 py-2">{species.continent}</td>
              <td className="px-4 py-2">{species.weight}</td>
              <td className="px-4 py-2">{species.height}</td>
              <td className="px-4 py-2">{species.horns}</td>
              <td className="px-4 py-2">
                <button
                  className="text-blue-500 underline flex items-center"
                  onClick={() => openModal(species.picture)}
                >
                  <span>View</span>
                  {/* <span className="ml-1">
                    <i className="fas fa-filter"></i>
                  </span> */}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && selectedImage && (
        <div
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50"
          onClick={closeModal}
        >
          <div
            className="bg-white p-4 rounded-lg shadow-lg"
            onClick={(e) => e.stopPropagation()}
          >
            <button className="mb-2 text-red-500" onClick={closeModal}>
              Close
            </button>
            <img
              src={selectedImage}
              alt="Species"
              className="max-w-full max-h-full"
            />
          </div>
        </div>
      )}
    </>
  );
};

export default MyTable;
