import React from 'react';
import { Scatter } from 'react-chartjs-2';

const ScatterPlot = ({ data }) => {
  // Function to generate random color
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  // Prepare data for the scatter plot
  const allChartData = {
    datasets: [
      {
        label: 'All Species',
        data: data.map((species) => ({ x: species.height, y: species.weight })),
        backgroundColor: getRandomColor(),
        borderColor: 'rgba(0, 0, 0, 0.5)',
        borderWidth: 1,
        pointRadius: 6,
        pointHoverRadius: 8,
      },
    ],
  };

  // Separate data points based on continent
  const continentChartData = {
    datasets: [],
  };
  const continents = [...new Set(data.map((species) => species.continent))];
  continents.forEach((continent) => {
    const continentSpecies = data.filter(
      (species) => species.continent === continent
    );
    const dataset = {
      label: continent,
      data: continentSpecies.map((species) => ({
        x: species.height,
        y: species.weight,
      })),
      backgroundColor: getRandomColor(),
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 1,
      pointRadius: 6,
      pointHoverRadius: 8,
    };
    continentChartData.datasets.push(dataset);
  });

  const hornsChartData = {
    datasets: [],
  };
  const horns = [...new Set(data.map((species) => species.horns))];
  horns.forEach((horn) => {
    const hornSpecies = data.filter((species) => species.horns === horn);
    const dataset = {
      label: horn,
      data: hornSpecies.map((species) => ({
        x: species.height,
        y: species.weight,
      })),
      backgroundColor: getRandomColor(),
      borderColor: 'rgba(0, 0, 0, 0.5)',
      borderWidth: 1,
      pointRadius: 6,
      pointHoverRadius: 8,
    };
    hornsChartData.datasets.push(dataset);
  });

  // Chart options
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Height' },
        beginAtZero: true,
      },
      y: {
        title: { display: true, text: 'Weight' },
        beginAtZero: true,
      },
    },
  };

  return (
    <div className="flex">
      <div className="w-1/2 h-[500px]">
        <Scatter data={allChartData} options={chartOptions} />
      </div>
      <div className="w-1/2 h-[500px]">
        <Scatter data={continentChartData} options={chartOptions} />
      </div>
      <div className="w-1/2 h-[500px]">
        <Scatter data={hornsChartData} options={chartOptions} />
      </div>
    </div>
  );
};

export default ScatterPlot;
