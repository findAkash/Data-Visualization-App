import React, { useEffect, useState } from 'react';
import API from '../services/API';
import Navbar from '../components/Nav';
import Search from '../components/Search';
import DataTable from '../components/DataTable';
import ScatterPlotMatrix from '../components/charts/ScatterPlotMatrix';
import LineChart from '../components/charts/LineChart';
const Dashboard = () => {
  const [data, setData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // New loading state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await API.fetchData();
        setData(result.data.species);
        setIsLoading(false); // Set loading to false when data is fetched
      } catch (error) {
        setError('Error fetching data');
        setIsLoading(false); // Set loading to false if there's an error
      }
    };
    fetchData();
  }, [searchQuery]);
  return (
    <div className="App p-0">
      <div className="Navbar mb-4">
        <Navbar />
      </div>
      {/* {error && <div className="text-red-500">{error}</div>} */}
      <div className="container mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 gap-4 mt-8">
        <section className="bg-white shadow-lg rounded-lg">
          <div className="p-4 border-b border-gray-200 flex justify-between items-center">
            <Search search={searchQuery} setSearch={setSearchQuery} />
          </div>
          <div className="p-4 h-[500px] flex flex-col">
            {isLoading ? (
              <div>Loading...</div> // Render loading indicator
            ) : (
              <>
                <DataTable data={data} searchQuery={searchQuery} />
              </>
            )}
          </div>
        </section>

        {/* Right Section */}
        <section className="flex flex-col mt-4 mb-4 space-y-4">
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-2xl font-bold">Line Chart</h1>

            <LineChart data={data} />
          </div>
          <div className="bg-white shadow-lg rounded-lg p-4">
            <h1 className="text-2xl font-bold">Scatter Plot</h1>

            <ScatterPlotMatrix data={data} />
          </div>
        </section>
      </div>
    </div>
  );
};

export default Dashboard;
