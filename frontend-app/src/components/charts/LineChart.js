// components/LineGraphHeightWeight.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title,
  Tooltip,
  Legend,
  CategoryScale,
} from 'chart.js';

// import './css/chart.css';

ChartJS.register(
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  CategoryScale,
  Title,
  Tooltip,
  Legend
);

// Define colors for each continent
const continentColors = {
  Africa: 'rgba(255, 99, 132, 1)', // Red
  Asia: 'rgba(54, 162, 235, 1)', // Blue
  Europe: 'rgba(75, 192, 192, 1)', // Cyan
  'North America': 'rgba(255, 159, 64, 1)', // Orange
  'South America': 'rgba(153, 102, 255, 1)', // Purple
  Oceania: 'rgba(255, 206, 86, 1)', // Yellow
  Antarctica: 'rgba(100, 100, 255, 1)', // Light Blue
};

const LineGraphHeightWeight = ({ data }) => {
  // Sort data by weight in ascending order
  const sortedData = data.sort((a, b) => a.weight - b.weight);

  // Create labels for species names
  const labels = sortedData.map((species) => species.name);

  // Create datasets for height and weight
  const heightData = {
    label: 'Height',
    data: sortedData.map((species) => species.height),
    borderColor: 'rgba(75,192,192,1)',
    borderWidth: 3,
    fill: false,
    pointBackgroundColor: sortedData.map(
      (species) => continentColors[species.continent] || 'rgba(0, 0, 0, 1)'
    ),
    pointRadius: 6,
    pointHoverRadius: 10,
    pointBorderColor: sortedData.map(
      (species) => continentColors[species.continent] || 'rgba(0, 0, 0, 1)'
    ),
    pointBorderWidth: 3,
  };

  const weightData = {
    label: 'Weight',
    data: sortedData.map((species) => species.weight),
    borderColor: 'rgba(153,102,255,1)',
    borderWidth: 3,
    fill: false,
    pointBackgroundColor: sortedData.map(
      (species) => continentColors[species.continent] || 'rgba(0, 0, 0, 1)'
    ),
    pointRadius: 6,
    pointHoverRadius: 10,
    pointBorderColor: sortedData.map(
      (species) => continentColors[species.continent] || 'rgba(0, 0, 0, 1)'
    ),
    pointBorderWidth: 3,
  };

  const lineData = {
    labels,
    datasets: [heightData, weightData],
  };

  const lineOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        title: { display: true, text: 'Species' },
        ticks: {
          autoSkip: false,
          maxRotation: 90,
          minRotation: 45,
        },
      },
      y: {
        title: { display: true, text: 'Value' },
        beginAtZero: true,
      },
    },
    plugins: {
      legend: { display: true },
      tooltip: {
        enabled: true,
        callbacks: {
          label: (context) => {
            const species = sortedData[context.dataIndex];
            return [
              `Name: ${species.name}`,
              `Height: ${species.height}`,
              `Weight: ${species.weight}`,
              `Continent: ${species.continent}`,
              `Horns: ${species.horns}`,
            ];
          },
        },
      },
    },
  };

  return (
    <div className="w-full h-[500px]">
      <Line data={lineData} options={lineOptions} />
    </div>
  );
};

export default LineGraphHeightWeight;
