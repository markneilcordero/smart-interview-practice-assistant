import React from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register chart.js modules
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const LineChartComponent = ({ progressData }) => {
  const labels = progressData.map((item, i) => `Session ${i + 1}`);
  const values = progressData.map((item) => item.correctCount);

  const data = {
    labels,
    datasets: [
      {
        label: "Correct Answers",
        data: values,
        fill: false,
        borderColor: "#17a2b8",
        backgroundColor: "#17a2b8",
        tension: 0.3,
        pointRadius: 5,
        pointHoverRadius: 7,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: "📈 Progress Over Sessions",
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
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChartComponent;
