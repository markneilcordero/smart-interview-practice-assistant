import React from "react";
import { Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js modules
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const BarChartComponent = ({ difficultyData }) => {
  const labels = Object.keys(difficultyData); // ['Easy', 'Medium', 'Hard']
  const values = Object.values(difficultyData); // [5, 3, 2]

  const data = {
    labels,
    datasets: [
      {
        label: "Questions by Difficulty",
        data: values,
        backgroundColor: ["#20c997", "#0d6efd", "#e83e8c"],
        borderRadius: 6,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      title: {
        display: true,
        text: "📊 Difficulty Breakdown",
        padding: 10,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        },
      },
    },
  };

  return (
    <div className="card p-3 mb-4">
      <Bar data={data} options={options} />
    </div>
  );
};

export default BarChartComponent;
